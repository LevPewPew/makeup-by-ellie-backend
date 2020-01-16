const Service = require('../models/service');

const index = async (req, res) => {
  try {
    const services = await Service.find();
    res.send(services);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

// Only available for admin user

const create = async (req, res) => {
  const {
    title,
    description,
    imageUrl
  } = req.body;

  try {
    const newService = await Service.create({ title, description, imageUrl });
    res.send(newService);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  create
}
