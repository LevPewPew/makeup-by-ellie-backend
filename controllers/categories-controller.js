const Category = require('../models/category');

const index = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(404).send(err);
  }
}

const create = async (req, res) => {
  const {
    title,
    description
  } = req.body;
  
  try {
    const newCategory = await Category.create({title, description});
    res.send(newCategory);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  create
}
