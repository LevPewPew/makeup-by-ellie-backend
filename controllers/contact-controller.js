const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

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
    email,
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
      email,
      eventDate,
      serviceType,
      totalPeopleJustMakeup,
      totalPeopleWithHair,
      timeToFinish,
      applicationAddress,
      howDidYouHear,
      addedQuestionsOrInfo });
    res.send(`Thank you, ${name} for your inquiry. I will get back to you asap.`);

  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER, //Add this to .env file - You need valid credentials to be able to send emails
          pass: process.env.GMAIL_PASS 
        }
  });
  
  transporter.sendMail({
      from: `${name} <${email}>`, // sender address
      to: "peter.pawar2@gmail.com", // list of receivers
      subject: "You have a new enquiry", // Subject line
      html: `<h1>You have a new inquiry</h1><h2>Name:${name}</h2><h2>Contact:${mobile}</h2> ` // html body
    },function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  create,
  getContact
}
