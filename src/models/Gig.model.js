const { model, Schema } = require('mongoose');
const searchable = require('mongoose-regex-search');

const GigSchema = new Schema({
  artist: {
    type: String,
    required: [true, 'Artist is required.'],
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
    required: [true, 'Date is required.'],
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
    required: [true, 'Creator is required.']
  }
});

GigSchema.plugin(searchable);

const GigModel = model('Gig', GigSchema);

module.exports = GigModel;
