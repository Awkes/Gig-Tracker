const GigModel = require('../models/Gig.model');

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
  const { search, sort } = req.query;
  const limit = req.query && Number(req.query.limit) || null;
  let page = req.query && Number(req.query.page) || 1;

  try {
    // Pagination - Get number of documents and pages according to limit
    const count = await GigModel
      .search(search || null, { creator: userId })
      .countDocuments();
    const totalPages = Math.ceil(count / (limit || count)) || 0;
    page = page < totalPages ? page : totalPages;
    
    const response = await GigModel
      .search(search || null, { creator: userId })
      .sort({ date: sort || 'desc' })
      .skip((page-1) * limit)
      .limit(limit)

    res.status(200).send({
      totalGigs: count,
      gigsPerPage: limit || count,
      totalPages,
      currentPage: page,
      searchString: search || null,
      results: response
    });
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to get gigs for user with id: ${userId}.`,
      error: error.message
    })
  }
}

const getGig = async (req, res) => {
  const { gigId } = req.params;
  
  try {
    const response = await GigModel.findById(gigId);
    if (!response) throw new Error('No gig found.');
    res.status(200).send(response);
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to get gig with id: ${gigId}.`,
      error: error.message
    })
  }
}

const updateGig = async (req, res) => {
  const { gigId } = req.params;

  try {
    const response = await GigModel.findByIdAndUpdate(
      gigId, req.body, { new: true, runValidators: true }
    );
    if (!response) throw new Error('No gig found');
    res.status(200).send({
      message: `Gig with id ${gigId} successfully updated.`,
      ...response.toObject(),
    });
  } 
  catch(error) {
    res.status(500).send({
      message: `Error while trying to update gig with id: ${gigId}.`,
      error: error.message
    });
  }
}

const deleteGig = async (req, res) => {
  const { gigId } = req.params;

  try {
    const response = await GigModel.findByIdAndDelete(gigId);
    if (response !== null) {
      res.status(200).send({
        message: `Gig with id ${gigId} successfully deleted.`
      })
    } 
    else {
      throw new Error(`Gig with id: ${gigId} doesn't exist.`)
    }
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to delete gig with id: ${gigId}.`,
      error: error.message,
    })
  }
}

module.exports = { createGig, getGigs, getGig, updateGig, deleteGig }
