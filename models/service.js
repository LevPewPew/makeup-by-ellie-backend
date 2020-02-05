const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    title: 
    {
      type: String,
      required: true
    },
    description:
    {
      type: String,
      required: true
    },
    imageUrl:
    {
      type: String,
      required: true
    },
    cost: 
    {
      type: String
    },
    duration:
    {
      type: String
    },
    disclaimer:
    {
      type: String
    }
  }
);

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;