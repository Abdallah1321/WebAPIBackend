import express from 'express'
import { createTrip, deleteTrip, getAllTrips, getTrip, updateTrip } from '../controllers/tripController.js'

const tripRouter = express.Router()

//Create trip
tripRouter.post('/', createTrip)

//Update trip
tripRouter.put('/:id', updateTrip)

//Delete trip
tripRouter.delete('/:id', deleteTrip)

//Get trip
tripRouter.get('/:id', getTrip)

//Get all trip
tripRouter.get('/', getAllTrips)


export default tripRouter