const Contact = require("../models/contact");
const sendGridMail = require("@sendgrid/mail");
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
    totalPeopleJustMakeup,
    totalPeopleWithHair,
    timeToFinish,
    applicationAddress,
    howDidYouHear,
    addedQuestionsOrInfo,
  } = req.body;

  const message = {
    to: process.env.CONTACT_DESTINATION,
    from: "info@makeupbyellie.com",
    subject: "MBE Contact Form Enquiry",
    text: "huzzah!",
    html: `<h1>You have a new inquiry</h1>
    <h2>Name: ${name}</h2>
    <h2>Contact: ${mobile}</h2>
    <h2>Email: ${email}</h2>
    <h2>Event Date: ${eventDate}</h2>
    <h2>Type of Service: ${serviceType}</h2>
    <h2>Number of People for Makeup: ${totalPeopleJustMakeup}</h2>
    <h2>Number of People for Hair: ${totalPeopleWithHair}</h2>
    <h2>Time to be Ready By: ${timeToFinish}</h2>
    <h2>Address: ${applicationAddress}</h2>
    <h2>How did you hear about us: ${howDidYouHear}</h2>
    <h2>Additional Questions: ${addedQuestionsOrInfo}</h2>`,
  };

  try {
    await sendGridMail.send(message);
    await Contact.create({
      name,
      mobile,
      email,
      eventDate,
      serviceType,
      totalPeopleJustMakeup,
      totalPeopleWithHair,
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
