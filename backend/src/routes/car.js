const express = require('express')
const router = new express.Router()
const { authenticateToken } = require('../middlewares/auth')
const carService = require('../service/car')

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

    const car = await carService.createCar(category, color, model, make, registrationNo, name)

    res.status(201).json(car)
  } catch (error) {
    console.error('Error creating car:', error)
    res.status(500).json({ error: error.message || 'An error occurred while creating the car' })
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
    const totalCars = await carService.getTotalCarCount()
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

    const cars = await carService.getCars(sortBy, sortOrder, page, limit)

    res.status(200).json(cars)
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

    const car = await carService.getCarById(id)

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

    const updatedCar = await carService.updateCar(id, category, color, model, make, registrationNo, name)

    res.status(200).json(updatedCar)
  } catch (error) {
    console.error('Error updating car:', error)
    res.status(500).json({ error: error.message || 'An error occurred while updating the car' })
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

    const result = await carService.deleteCar(id)

    res.status(200).json(result)
  } catch (error) {
    console.error('Error deleting car:', error)
    res.status(500).json({ error: 'An error occurred while deleting the car' })
  }
})

module.exports = router
