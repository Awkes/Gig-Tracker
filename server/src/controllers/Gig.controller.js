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
  
  try {
    const response = await GigModel.find({ creator: userId });
    if (response.length < 1) throw new Error('No gigs found.');
    res.status(200).send(response);
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

module.exports = { createGig, getGigs, getGig, updateGig }
