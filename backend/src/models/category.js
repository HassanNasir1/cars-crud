const mongoose = require('mongoose');

/**
 * Category Schema
 * @typedef {Object} CategorySchema
 * @property {string} name - The name of the category. Required. Unique. Minimum length of 3 characters. Maximum length of 50 characters.
 * @property {Date} createdAt - The creation date of the category.
 * @property {Date} updatedAt - The last update date of the category.
 */

const categorySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
      },
    },
    {timestamps: true},
);

/**
 * Category Model
 * @typedef {Object} CategoryModel
 * @property {Function} find - Find categories based on a query.
 * @property {Function} findById - Find a category by its ID.
 * @property {Function} create - Create a new category.
 * @property {Function} updateOne - Update a category based on a query.
 * @property {Function} deleteOne - Delete a category based on a query.
 */

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
