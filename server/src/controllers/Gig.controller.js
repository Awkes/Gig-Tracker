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

module.exports = { createGig }
