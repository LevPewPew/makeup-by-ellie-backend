const Contact = require('../models/contact');
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const index = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.find({ _id: req.params.id });
    res.send(contact);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const create = async (req, res) => {
  const {
    name,
    mobile,
    email,
    eventDate,
    serviceType,
    totalPeopleMakeup,
    totalPeopleHair,
    timeToFinish,
    applicationAddress,
    howDidYouHear,
    addedQuestionsOrInfo,
  } = req.body;

  const message = {
    to: process.env.CONTACT_DESTINATION,
    from: 'info@makeupbyellie.com',
    subject: 'MBE Contact Form Enquiry',
    html: `<h1>You have a new inquiry</h1>
    <h2>Name: <span style="font-weight:normal">${name}</span></h2>
    <h2>Contact: <span style="font-weight:normal">${mobile}</span></h2>
    <h2>Email: <span style="font-weight:normal">${email}</span></h2>
    <h2>Event Date: <span style="font-weight:normal">${eventDate}</span></h2>
    <h2>Type of Service: <span style="font-weight:normal">${serviceType}</span></h2>
    <h2>Number of People for Makeup: <span style="font-weight:normal">${totalPeopleMakeup}</span></h2>
    <h2>Number of People for Hair: <span style="font-weight:normal">${totalPeopleHair}</span></h2>
    <h2>Time to be Ready By: <span style="font-weight:normal">${timeToFinish}</span></h2>
    <h2>Address: <span style="font-weight:normal">${
      applicationAddress ?? "Ellie's Studio"
    }</span></h2>
    <h2>How did you hear about us: <span style="font-weight:normal">${
      howDidYouHear ?? '-'
    }</span></h2>
    <h2>Additional Questions: <span style="font-weight:normal">${
      addedQuestionsOrInfo ?? '-'
    }</span></h2>`,
  };

  try {
    await sendGridMail.send(message);
    await Contact.create({
      name,
      mobile,
      email,
      eventDate,
      serviceType,
      totalPeopleMakeup,
      totalPeopleHair,
      timeToFinish,
      applicationAddress,
      howDidYouHear,
      addedQuestionsOrInfo,
    });
    res.send(`Thank you, I will get back to you ASAP.`);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  index,
  create,
  getContact,
};
