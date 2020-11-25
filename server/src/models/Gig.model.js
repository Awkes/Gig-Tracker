const { model, Schema } = require('mongoose');
const searchable = require('mongoose-regex-search');

const GigSchema = new Schema({
  artist: {
    type: String,
    required: true,
    searchable: true
  },
  tour: {
    type: String,
    searchable: true
  },
  venue: {
    type: String,
    searchable: true
  },
  city: {
    type: String,
    searchable: true
  },
  country: {
    type: String,
    searchable: true
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    searchable: true
  },
  setlist: [{
    type: String,
    searchable: true
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

GigSchema.plugin(searchable);

const GigModel = model('Gig', GigSchema);

module.exports = GigModel;
