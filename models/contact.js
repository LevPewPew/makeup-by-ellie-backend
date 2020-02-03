const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: 
    {
      type: String,
      required: true
    },
    mobile:
    {
      type: String,
      required: true
    },
    email:
    {
      type: String,
      required: true
    },
    eventDate:
    {
      type: Date,
      required: true
    },
    serviceType:
    {
      type: String,
      required: true
    },
    totalPeopleJustMakeup:
    {
      type: Number,
      required: true
    },
    totalPeopleWithHair:
    {
      type: Number,
      required: true
    },
    timeToFinish:
    {
      type: String,
      required: true
    },
    applicationAddress:
    {
      type: String
    },
    howDidYouHear:
    {
      type: String,
      required: true
    },
    addedQuestionsOrInfo:
    {
      type: String,
      required: false
    }
  },{timestamps:true}
);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;