const Car = require('../models/car')

const createCar = async (category, color, model, make, registrationNo, name) => {
  try {
    const car = new Car({ category, color, model, make, registrationNo, name })
    await car.save()
    return car
  } catch (error) {
    throw error
  }
}

const getTotalCarCount = async () => {
  try {
    const totalCars = await Car.countDocuments()
    return totalCars
  } catch (error) {
    throw error
  }
}

const getCars = async (sortBy, sortOrder, page, limit) => {
  try {
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
      .populate({ path: 'category' })
      .lean()
      .exec()

    return {
      cars: cars.map(car => ({
        ...car,
        categoryData: car.category, // Assign complete category data to categoryData field
        category: car.category ? car.category._id : null // Assign category ID to category field
      })),
      params: {
        sortBy,
        sortOrder,
        page: pageNumber,
        limit: pageSize
      },
      totalCars
    }
  } catch (error) {
    throw error
  }
}

const getCarById = async id => {
  try {
    const car = await Car.findById(id)
    return car
  } catch (error) {
    throw error
  }
}

const updateCar = async (id, category, color, model, make, registrationNo, name) => {
  try {
    const car = await Car.findById(id)

    if (!car) {
      throw new Error('Car not found')
    }

    car.category = category
    car.color = color
    car.model = model
    car.make = make
    car.registrationNo = registrationNo
    car.name = name

    const validationError = car.validateSync()
    if (validationError) {
      const errors = Object.values(validationError.errors).map(err => err.message)
      throw new Error(errors.join(', '))
    }

    const existingCar = await Car.findOne({ registrationNo })
    if (existingCar && existingCar._id.toString() !== id) {
      throw new Error('Duplicate registration number')
    }

    const updatedCar = await car.save()
    return updatedCar
  } catch (error) {
    throw error
  }
}

const deleteCar = async id => {
  try {
    const car = await Car.findByIdAndRemove(id)

    if (!car) {
      throw new Error('Car not found')
    }

    return { message: 'Car deleted successfully' }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createCar,
  getTotalCarCount,
  getCars,
  getCarById,
  updateCar,
  deleteCar
}
