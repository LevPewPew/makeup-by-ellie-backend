const Work = require('../models/work');

const index = async (req, res) => {
  try {
    const works = await Work.find();
    res.send(works);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

// TODO this is just a clone of index action for now
const filteredIndex = async (req, res) => {
  try {
    const works = await Work.find();
    res.send(works);
  } catch (err) {
    res.status(404).send(err);
  }
}

const create = async (req, res) => {
  const {
    category,
    image
  } = req.body;
  
  try {
    const newWork = await Work.create({ category, image });
    res.send(newWork);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  filteredIndex,
  create
}
