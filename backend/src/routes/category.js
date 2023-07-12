const express = require('express')
const router = new express.Router()
const { authenticateToken } = require('../middlewares/auth')
const categoriesService = require('../service/category')

/**
 * Get all categories for dropdown
 * @name GET /dropdown
 * @function
 * @memberof module:routes/categories
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the list of categories or error
 */
router.get('/dropdown', async (req, res) => {
  try {
    const categories = await categoriesService.getCategories()
    res.status(200).json(categories)
  } catch (error) {
    console.error('Error retrieving categories:', error)
    res.status(500).json({ error: 'An error occurred while retrieving categories' })
  }
})

/**
 * Create a category
 * @name POST /
 * @function
 * @memberof module:routes/categories
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the created category data or error
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body

    // Check if the name is provided
    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    const category = await categoriesService.createCategory(name)

    res.status(201).json(category)
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(error.errors).map(err => err.message)
      res.status(400).json({ errors })
    } else {
      res.status(500).json({ error: error.message || 'An error occurred while creating the category' })
    }
  }
})

/**
 * Get all categories
 * @name GET /
 * @function
 * @memberof module:routes/categories
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the list of categories or error
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { sortBy, sortOrder, page, limit } = req.query

    const categories = await categoriesService.getAllCategories(sortBy, sortOrder, page, limit)

    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving categories' })
  }
})

/**
 * Get a category by ID
 * @name GET /:id
 * @function
 * @memberof module:routes/categories
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the category data or error
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const category = await categoriesService.getCategoryById(id)

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the category' })
  }
})

/**
 * Update a category
 * @name PATCH /:id
 * @function
 * @memberof module:routes/categories
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the updated category data or error
 */
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const category = await categoriesService.updateCategory(id, name)

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred while updating the category' })
  }
})

/**
 * Delete a category
 * @name DELETE /:id
 * @function
 * @memberof module:routes/categories
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with a success message or error
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const category = await categoriesService.deleteCategory(id)

    res.status(200).json({ message: 'Category deleted successfully', category })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({ error: 'An error occurred while deleting the category' })
  }
})

module.exports = router
