const { model, Schema } = require('mongoose');

const GigSchema = new Schema({
  artist: {
    type: String,
    required: true
  },
  tour: String,
  venue: String,
  city: String,
  country: String,
  date: {
    type: Date,
    required: true
  },
  notes: String,
  setlist: [String],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const GigModel = model('Gig', GigSchema);

module.exports = GigModel;
