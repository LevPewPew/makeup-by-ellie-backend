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
    const newContact = await Service.create({ 
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
    res.send(newContact);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  create
}
