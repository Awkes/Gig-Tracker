const GigModel = require('../models/Gig.model');
const verifyUser = require('../utils/verifyUser');

const createGig = async (req, res) => {
  const gig = new GigModel(req.body);

  try {
    const response = await gig.save();
    res.status(201).send(response);
  }
  catch(error) {
    res.status(500).send({
      message: 'Error while tying to create gig.',
      error: error.message
    });
  } 
}

const getGigs = async (req, res) => {
  const { userId } = req.params;
  const { search, sort, order } = req.query;
  const limit = req.query && Number(req.query.limit) || null;
  let page = req.query && Number(req.query.page) || 1;
  
  if (verifyUser(userId, req, res)) {
    try {
      // Pagination - Get number of documents and pages according to limit
      const count = await GigModel
        .search(search || null, { creator: userId })
        .countDocuments();
      const totalPages = Math.ceil(count / (limit || count)) || 1;
      page = page < totalPages ? page : totalPages;

      const response = await GigModel
        .search(search || null, { creator: userId })
        .sort({ [order || 'date']: sort || 'desc' })
        .skip((page-1) * limit)
        .limit(limit)
      
      res.status(200).send({
        totalGigs: count,
        gigsPerPage: limit || count,
        totalPages,
        currentPage: page,
        searchString: search || null,
        results: response.map(gig => {
          const date = new Date(gig.date);
          return ({
            ...gig.toObject(), 
            date: `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+date.getDate()).slice(-2)}`
          });
        })
      });
    }
    catch(error) {
      res.status(500).send({
        message: `Error while trying to get gigs for user with id: ${userId}.`,
        error: error.message
      })
    }
  }
}

const getGig = async (req, res) => {
  const { gigId } = req.params;
  
  try {
    const response = await GigModel.findById(gigId);
    if (!response) throw new Error('No gig found.');
    if (verifyUser(response.creator.toString(), req, res)) {
      const date = new Date(response.date);
      res.status(200).send({
        ...response.toObject(),
        date: `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+date.getDate()).slice(-2)}`
      });
    }
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to get gig with id: ${gigId}.`,
      error: error.message
    })
  }
}

const updateGig = async (req, res) => {
  const { _id } = req.body;

  try {
    const gig = await GigModel.findById(_id);
    if (!gig) throw new Error('No gig found.');
    if (verifyUser(gig.creator.toString(), req, res)) {
      Object.keys(req.body).forEach(key => gig[key] = req.body[key]);   
      gig.save();
      res.status(200).send({
        message: `Gig with id ${_id} successfully updated.`,
        ...gig.toObject(),
      });
    }
  } 
  catch(error) {
    res.status(500).send({
      message: `Error while trying to update gig with id: ${_id}.`,
      error: error.message
    });
  }
}

const deleteGig = async (req, res) => {
  const { _id } = req.body;

  try {
    const gig = await GigModel.findById(_id);
    if (!gig) throw new Error(`Gig with id: ${_id} doesn't exist.`)
    if (verifyUser(gig.creator.toString(), req, res)) {
      await GigModel.findByIdAndDelete(_id);
      res.status(200).send({ message: `Gig with id ${_id} successfully deleted.` })
    }
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to delete gig with id: ${_id}.`,
      error: error.message,
    })
  }
}

const getStats = async (req, res) => {
  const { userId } = req.params;
  if (verifyUser(userId, req, res)) {
    try {
      const gigs = await GigModel.find({ creator: userId, date: { $lt: new Date() } }).sort({ date: 'asc' });
      
      if (gigs.length < 1) throw new Error('No stats available for user.');

      const totalGigs = gigs.length;
      const totalArtists = [...new Set(gigs.map(({ artist }) => artist))].length;
      const totalVenues = [...new Set(gigs.map(({ venue, city, country }) => 
        JSON.stringify({ venue, city, country })).filter(val => val !== '{}'))].length;
      const totalCities = [...new Set(gigs.map(({ city, country }) => 
        JSON.stringify({ city, country })).filter(val => val !== '{}'))].length;
      const totalCountries = [...new Set(gigs.map(({ country }) => country))].length;
      
      const yearlyVisitedGigs = (() => {
        const currentYear = new Date().getFullYear();
        const visitedGigs = {};
        for (let year = currentYear; year > currentYear-5; year--)        
          visitedGigs[year] = gigs.filter(({ date }) => new Date(date).getFullYear() === year).length;
        return Object.entries(visitedGigs);
      })();
      
      const gigsVisitedOverTime = (() => {
        const formatDate = date => `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}`
        const initialValues = {};    
        
        // Get all months from first visited gig up until today
        const currentMonth = formatDate(new Date());
        let monthIterator = formatDate(new Date(gigs[0].date));
        while (monthIterator !== currentMonth) {
          initialValues[monthIterator] = 0;
          let [year, month] = monthIterator.split('-');
          month++;
          if (month > 12) { year++; month = 1; }
          monthIterator = `${year}-${('0'+month).slice(-2)}`;
        }

        // Populate every month with number of visited gigs
        const visitedGigs = gigs.reduce((acc, val) => {
          const month = formatDate(new Date(val.date));
          acc[month] = 1 + (Number(acc[month]) || 0);
          return acc;
        }, initialValues);

        return Object.entries(visitedGigs);
      })();

      const mostSeenArtists = Object.entries(gigs.reduce((acc, { artist }) => {
        acc[artist] = 1 + (Number(acc[artist]) || 0);
        return acc;
      }, {})).sort((a, b) => a[1] < b[1] ? 1 : -1).slice(0, 5);
      
      const mostVisitedVenues = Object.entries(gigs.reduce((acc, { venue, city, country }) => {
        if (!venue) return acc;
        const key = venue+(city ? `, ${city}` : '')+(country ? `, ${country}` : '');
        acc[key] = 1 + (Number(acc[key]) || 0);
        return acc;
      }, {})).sort((a, b) => a[1] < b[1] ? 1 : -1).slice(0, 5);
      
      const mostVisitedCities = Object.entries(gigs.reduce((acc, { city, country }) => {
        if (!city) return acc;
        const key = city+(country ? `, ${country}` : '');
        acc[key] = 1 + (Number(acc[key]) || 0);
        return acc;
      }, {})).sort((a, b) => a[1] < b[1] ? 1 : -1).slice(0, 5);
    
      const mostVisitedCountries = Object.entries(gigs.reduce((acc, { country }) => {
        if (!country) return acc;
        acc[country] = 1 + (Number(acc[country]) || 0);
        return acc;
      }, {})).sort((a, b) => a[1] < b[1] ? 1 : -1).slice(0, 5);

      res.status(200).send({
        totalGigs, totalArtists, totalVenues, totalCities, totalCountries,
        yearlyVisitedGigs, gigsVisitedOverTime, mostSeenArtists, mostVisitedVenues,
        mostVisitedCities, mostVisitedCountries
      });
    }
    catch(error) {
      res.status(500).send({
        message: `Error while trying to get stats for user with id: ${userId}.`,
        error: error.message
      })
    }
  }
}

module.exports = { createGig, getGigs, getGig, updateGig, deleteGig, getStats }
