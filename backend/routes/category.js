const express = require("express");
const router = express.Router();

// Import the Category model
const Category = require("../models/category");

const { authenticateToken } = require("../middlewares/auth");

// Get all categories for dropdown
router.get("/dropdown", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: "asc" });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving categories" });
  }
});

// CRUD operations for categories
// Create a category
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the name is provided
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Check if the category with the same name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Category with the same name already exists" });
    }

    // Create a new category
    const category = new Category({ name });

    // Save the category to the database
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      console.error("Error creating category:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the category" });
    }
  }
});

// Get all categories
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { sortBy, sortOrder, page, limit } = req.query;

    const sortOptions = {};
    if (sortBy && sortOrder) {
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    const totalCategories = await Category.countDocuments();

    const categories = await Category.find()
      .sort(sortOptions)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      categories,
      params: {
        sortBy,
        sortOrder,
        page,
        limit,
      },
      totalCategories,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving categories" });
  }
});

// Get a category by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category by ID
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error retrieving category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the category" });
  }
});

// Update a category
router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find the category by ID
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if the name is provided
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check if the name is being changed
    if (category.name !== name) {
      // Check if the new name already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ error: "Category name already exists" });
      }
    }

    // Update the category name
    category.name = name;

    // Save the updated category to the database
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the category" });
  }
});

// Delete a category
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category by ID and remove it
    const category = await Category.findByIdAndRemove(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the category" });
  }
});

module.exports = router;
