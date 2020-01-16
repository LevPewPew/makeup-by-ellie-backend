const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: 
    {
      type: String,
      required: true
    },
    gender:
    {
      type: String,
      required: true
    },
    phone:
    {
      type: String,
      required: true
    },
    address:
    {
      type: String,
      required: true
    },
    bookingDate:
    {
      type: Date,
      required: true
    },
    readyByTime:
    {
      type: String,
      required: true
    },
    category:
    {
      type: String,
      required: true
    }
  },{timestamps:true}
);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;