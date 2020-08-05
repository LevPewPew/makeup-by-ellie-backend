const Work = require('../models/work');
const url = require('url');
const https = require('https');
const getImgRes = require('image-size');

const index = async (req, res) => {
  try {
    const works = await Work.find();
    res.send(works);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

const filteredIndex = async (req, res) => {
  const { category } = req.params;
  try {
    const works = await Work.find({category});
    res.send(works);
  } catch (err) {
    res.status(404).send(err);
  }
}

const create = async (req, res) => {
  const {
    category,
    imageUrl
  } = req.body;

  const options = url.parse(imageUrl);
  https.get(options, function (response) {
    var chunks = [];
    response.on('data', function (chunk) {
      chunks.push(chunk);
    }).on('end', function() {
      const buffer = Buffer.concat(chunks);
      const imgRes = getImgRes(buffer);
      console.log('imgres width: ', imgRes.width);
      console.log('imgres height: ', imgRes.height);
    });
  });

  try {
    const newWork = await Work.create({ category, imageUrl });
    res.send(newWork);
  } catch (err) {
    res.status(400).send(err);
  }
}

const edit = async (req, res) => {
  const {id} = req.params;

  try {
    const editWork = await Work.findOneAndUpdate({_id: id},{$set: {...req.body}});
    res.send(editWork);
  } catch (err) {
    res.status(400).send(err);
  }
}

const remove = async (req, res) => {
  const {id} = req.params;

  try {
    const removeWork = await Work.findOneAndDelete({_id: id});
    res.send(removeWork);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  index,
  filteredIndex,
  create,
  edit,
  remove
}
