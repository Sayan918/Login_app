import { Schema, model, models } from 'mongoose';

const DetailsSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  creatortype: {
    type: String,
    required: [true, 'creatertype is required.'],
  },
  degree: {
    type: String,
    required: [true, 'Degree is required.'],
  },
  clgname: {
    type: String,
    required: [true, 'Clgname is required.'],
  },
  passingyear: {
    type: Number,
    required: [true, 'passing year is required.'],
  },
  ClgId: {
    type: String,
    required: [true, 'Clg Id is required.'],
  },

});

const Details = models.Details || model('Details', DetailsSchema);

export default Details;