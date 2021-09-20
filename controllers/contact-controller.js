const Contact = require("../models/contact");
const nodemailer = require("nodemailer");
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

// Only available for admin user

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

function getMessage() {
  const body = "This is a test email using SendGrid from Node.js";
  return {
    to: "info@makeupbyellie.com",
    from: "info@makeupbyellie.com",
    subject: "Test email with Node.js and SendGrid",
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

async function sendEmail() {
  try {
    await sendGridMail.send(getMessage());
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
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
    addedQuestionsOrInfo,
  } = req.body;

  try {
    await sendEmail();

    // await Contact.create({
    //   name,
    //   mobile,
    //   email,
    //   eventDate,
    //   serviceType,
    //   totalPeopleJustMakeup,
    //   totalPeopleWithHair,
    //   timeToFinish,
    //   applicationAddress,
    //   howDidYouHear,
    //   addedQuestionsOrInfo,
    // });
    res.send(
      `Thank you, ${name} for your inquiry. I will get back to you asap.`
    );

    // let transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.GMAIL_USER, //Add this to .env file - You need valid credentials to be able to send emails
    //     pass: process.env.GMAIL_PASS,
    //   },
    // });

    // transporter.sendMail(
    //   {
    //     from: `${name} <${email}>`,
    //     to: "info@makeupbyellie.com",
    //     subject: "Makeup by Ellie: New Inquiry",
    //     html: `<h1>You have a new inquiry</h1>
    //   <h2>Name: ${name}</h2>
    //   <h2>Contact: ${mobile}</h2>
    //   <h2>Email: ${email}</h2>
    //   <h2>Event Date: ${eventDate}</h2>
    //   <h2>Type of Service: ${serviceType}</h2>
    //   <h2>Number of People for Makeup: ${totalPeopleJustMakeup}</h2>
    //   <h2>Number of People for Hair: ${totalPeopleWithHair}</h2>
    //   <h2>Time to be Ready By: ${timeToFinish}</h2>
    //   <h2>Address: ${applicationAddress}</h2>
    //   <h2>How did you hear about us: ${howDidYouHear}</h2>
    //   <h2>Additional Questions: ${addedQuestionsOrInfo}</h2>`,
    //   },
    //   (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   }
    // );
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  index,
  create,
  getContact,
};

// const sendGridMail = require("@sendgrid/mail");
// sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

// function getMessage() {
//   const body = "This is a test email using SendGrid from Node.js";
//   return {
//     to: "you@domain.com",
//     from: "verifiedemail@previousstep.com",
//     subject: "Test email with Node.js and SendGrid",
//     text: body,
//     html: `<strong>${body}</strong>`,
//   };
// }

// async function sendEmail() {
//   try {
//     await sendGridMail.send(getMessage());
//     console.log("Test email sent successfully");
//   } catch (error) {
//     console.error("Error sending test email");
//     console.error(error);
//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// }

// (async () => {
//   console.log("Sending test email");
//   await sendEmail();
// })();
