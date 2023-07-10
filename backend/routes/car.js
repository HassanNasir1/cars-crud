const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middlewares/auth')

const Car = require('../models/car')
const Category = require('../models/category')

/**
 * Create a car
 * @name POST /
 * @function
 * @memberof module:routes/cars
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the created car data or error
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { category, color, model, make, registrationNo, name } = req.body

    // Create a new car
    const car = new Car({ category, color, model, make, registrationNo, name })

    // Save the car to the database
    await car.save()

    res.status(201).json(car)
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(error.errors).map(err => err.message)
      res.status(400).json({ errors })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // Handle duplicate key error
      const fieldName = Object.keys(error.keyValue)[0]
      const errorMessage = `Duplicate ${fieldName}: ${error.keyValue[fieldName]}`
      res.status(400).json({ error: errorMessage })
    } else {
      console.error('Error creating car:', error)
      res.status(500).json({ error: 'An error occurred while creating the car' })
    }
  }
})

/**
 * Get total number of cars
 * @name GET /count
 * @function
 * @memberof module:routes/cars
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the total number of cars or error
 */
router.get('/count', async (req, res) => {
  try {
    const totalCars = await Car.countDocuments()
    res.status(200).json({ totalCars })
  } catch (error) {
    console.error('Error retrieving total car count:', error)
    res.status(500).json({ error: 'An error occurred while retrieving total car count' })
  }
})

/**
 * Get all cars
 * @name GET /
 * @function
 * @memberof module:routes/cars
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the list of cars or error
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { sortBy, sortOrder, page, limit } = req.query

    const sortOptions = {}
    if (sortBy && sortOrder) {
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1
    }

    const pageNumber = parseInt(page) || 1
    const pageSize = parseInt(limit) || 10

    const totalCars = await Car.countDocuments()

    const cars = await Car.find()
      .sort(sortOptions)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: 'category'
      })
      .lean()
      .exec()

    res.status(200).json({
      cars: cars.map(car => ({
        ...car,
        categoryData: car.category, // Assign complete category data to categoryData field
        category: car.category ? car.category._id : null // Assign category ID to category field
      })),
      params: {
        sortBy,
        sortOrder,
        page,
        limit
      },
      totalCars
    })
  } catch (error) {
    console.error('Error retrieving cars:', error)
    res.status(500).json({ error: 'An error occurred while retrieving cars' })
  }
})

/**
 * Get a car by ID
 * @name GET /:id
 * @function
 * @memberof module:routes/cars
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the car data or error
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    // Find the car by ID
    const car = await Car.findById(id)

    if (!car) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json(car)
  } catch (error) {
    console.error('Error retrieving car:', error)
    res.status(500).json({ error: 'An error occurred while retrieving the car' })
  }
})

/**
 * Update a car
 * @name PATCH /:id
 * @function
 * @memberof module:routes/cars
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with the updated car data or error
 */
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { category, color, model, make, registrationNo, name } = req.body

    // Find the car by ID
    const car = await Car.findById(id)

    if (!car) {
      return res.status(404).json({ error: 'Car not found' })
    }

    // Update the car details
    car.category = category
    car.color = color
    car.model = model
    car.make = make
    car.registrationNo = registrationNo
    car.name = name

    // Validate the updated car data
    const validationError = car.validateSync()
    if (validationError) {
      const errors = Object.values(validationError.errors).map(err => err.message)
      return res.status(400).json({ errors })
    }

    // Check if the registration number already exists
    const existingCar = await Car.findOne({ registrationNo })
    if (existingCar && existingCar._id.toString() !== id) {
      return res.status(400).json({ error: 'Duplicate registration number' })
    }

    // Save the updated car to the database
    const updatedCar = await car.save()

    res.status(200).json(updatedCar)
  } catch (error) {
    console.error('Error updating car:', error)
    res.status(500).json({ error: 'An error occurred while updating the car' })
  }
})

/**
 * Delete a car
 * @name DELETE /:id
 * @function
 * @memberof module:routes/cars
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with a success message or error
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    // Find the car by ID and remove it
    const car = await Car.findByIdAndRemove(id)

    if (!car) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json({ message: 'Car deleted successfully' })
  } catch (error) {
    console.error('Error deleting car:', error)
    res.status(500).json({ error: 'An error occurred while deleting the car' })
  }
})

module.exports = router
