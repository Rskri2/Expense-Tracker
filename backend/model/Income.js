const mongoose = require('mongoose');
const mongoosepaginate = require('mongoose-paginate-v2');
const User = require('./User');

const incomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, ' Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    type: {
      type: String,
      default: 'income',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: [true, 'category is required'],
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
