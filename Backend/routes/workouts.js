const express = require("express")
const router = express.Router()
const {CreatWorkout, GetallWorkouts, GetSingleW, DeleteWorkout, UpdateWorkout }= require('../ControllRoutes/Controll')


// all workouts
router.get('/', GetallWorkouts)

// get a single id workouts
router.get('/:id', GetSingleW)

// post for adding new workout
router.post('/', CreatWorkout)

// delete for adding new workout
router.delete('/:id', DeleteWorkout)

// UPDATE for adding new workout
router.patch('/:id', UpdateWorkout)


module.exports = router