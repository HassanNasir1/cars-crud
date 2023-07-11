const mongoose = require('mongoose');

/**
 * Car Schema
 * @typedef {Object} CarSchema
 * @property {string} name - The name of the car. Required.
 * @property {mongoose.Types.ObjectId} category - The category of the car. Required.
 * @property {mongoose.Schema.Types.Mixed} categoryData - Additional data for the category.
 * @property {string} color - The color of the car. Required.
 * @property {string} model - The model of the car. Required.
 * @property {string} make - The make of the car. Required.
 * @property {string} registrationNo - The registration number of the car. Required. Unique.
 * @property {Date} createdAt - The creation date of the car.
 * @property {Date} updatedAt - The last update date of the car.
 */

const carSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      categoryData: {
        type: mongoose.Schema.Types.Mixed,
      },
      color: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      make: {
        type: String,
        required: true,
      },
      registrationNo: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {timestamps: true},
);

/**
 * Car Model
 * @typedef {Object} CarModel
 * @property {Function} find - Find cars based on a query.
 * @property {Function} findById - Find a car by its ID.
 * @property {Function} create - Create a new car.
 * @property {Function} updateOne - Update a car based on a query.
 * @property {Function} deleteOne - Delete a car based on a query.
 */

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
