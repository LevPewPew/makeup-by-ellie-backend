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
    imageUrl,
    cost,
    duration,
    disclaimer
  } = req.body;

  try {
    const newService = await Service.create({ title, description, imageUrl, cost, duration, disclaimer });
    res.send(newService);
  } catch (err) {
    res.status(400).send(err);
  }
}

const edit = async (req, res) => {
  const {id} = req.params;

  try {
    const editService = await Service.findOneAndUpdate({_id: id},{$set: {...req.body}});
    res.send("Updated the record");
  } catch (err) {
    res.status(400).send(err);
  }
}

const remove = async (req, res) => {
  const {id} = req.params;

  try {
    const removeService = await Service.findOneAndDelete({_id: id});
    res.send(removeService);
  } catch (err) {
    res.status(400).send(err);
  }
}



module.exports = {
  index,
  create,
  edit,
  remove
}
