const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    categoryData: {
      type: mongoose.Schema.Types.Mixed
    },
    color: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    make: {
      type: String,
      required: true
    },
    registrationNo: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

const Car = mongoose.model('Car', carSchema)

module.exports = Car
