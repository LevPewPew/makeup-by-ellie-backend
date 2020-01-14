const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema(
  {
    category: 
    {
      type: String,
      required: true
    },
    image:
    {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
