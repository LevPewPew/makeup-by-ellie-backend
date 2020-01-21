const Contact = require('../models/contact');


// Only available for admin user

const index = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

const getContact = async (req, res) => {
  try {

    const contact = await Contact.find({_id:req.params.id});
    res.send(contact);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}


const create = async (req, res) => {
  const {
    name,
    mobile,
    eventDate,
    serviceType,
    totalPeopleJustMakeup,
    totalPeopleWithHair,
    timeToFinish,
    applicationAddress,
    howDidYouHear,
    addedQuestionsOrInfo
  } = req.body;

  try {
    const newContact = await Contact.create({ 
      name,
      mobile,
      eventDate,
      serviceType,
      totalPeopleJustMakeup,
      totalPeopleWithHair,
      timeToFinish,
      applicationAddress,
      howDidYouHear,
      addedQuestionsOrInfo });
    res.send(`Thank you, ${name} for your inquiry. I will get back to you asap.`);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  create,
  getContact
}
