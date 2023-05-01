import express from 'express'
import { createTrip, deleteTrip, getAllTrips, getWeather, getTrip, getTripBySearch, getTripCount, updateTrip, getFood } from '../controllers/tripController.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const tripRouter = express.Router()

//Create trip
tripRouter.post('/', verifyAdmin, createTrip)

//Update trip
tripRouter.put('/:id', verifyAdmin, updateTrip)

//Delete trip
tripRouter.delete('/:id', verifyAdmin, deleteTrip)

//Get trip
tripRouter.get('/:id', getTrip)

//Get all trip
tripRouter.get('/',  getAllTrips)

//Search for trip
tripRouter.get('/search/getTripBySearch', getTripBySearch)
tripRouter.get('/search/getTripCount', getTripCount)

tripRouter.get('/:id/getWeather', getWeather)
tripRouter.get('/:id/getFood', getFood)
tripRouter.get('/:id/getExchange', getFood)

export default tripRouter