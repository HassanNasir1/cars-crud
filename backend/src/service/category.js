const Category = require('../models/category');

const getCategories = async () => {
  try {
    const categories = await Category.find().sort({name: 'asc'});
    return categories;
  } catch (error) {
    throw error;
  }
};

const createCategory = async (name) => {
  try {
    const existingCategory = await Category.findOne({name});
    if (existingCategory) {
      throw new Error('Category with the same name already exists');
    }

    const category = new Category({name});
    await category.save();

    return category;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id, name) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }

    const existingCategory = await Category.findOne({name});
    if (existingCategory && existingCategory._id.toString() !== id) {
      throw new Error('Category name already exists');
    }

    category.name = name;
    await category.save();

    return category;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const category = await Category.findByIdAndRemove(id);
    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  } catch (error) {
    throw error;
  }
};

const getAllCategories = async (sortBy, sortOrder, page, limit) => {
  try {
    const sortOptions = {};
    if (sortBy && sortOrder) {
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    const totalCategories = await Category.countDocuments();

    const categories = await Category.find().sort(sortOptions).skip((pageNumber - 1) * pageSize).limit(pageSize);

    return {
      categories,
      params: {
        sortBy,
        sortOrder,
        page,
        limit,
      },
      totalCategories,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
