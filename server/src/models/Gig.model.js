const { model, Schema } = require('mongoose');

const GigSchema = new Schema({
  artist: String,
  tour: String,
  venue: String,
  country: String,
  city: String,
  date: Date,
  notes: String,
  setlist: [String],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const GigModel = model('gig', GigSchema);

module.exports = { GigModel }
