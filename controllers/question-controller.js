const Question = require('../models/question');

const index = async (req, res) => {
  try {
    const questions = await Question.find();
    res.send(questions);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}


// Only available for admin user

const create = async (req, res) => {
  const {
    question,
    answer
  } = req.body;

  try {
    const newQuestion = await Service.create({ question, answer });
    res.send(newQuestion);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  create
}
