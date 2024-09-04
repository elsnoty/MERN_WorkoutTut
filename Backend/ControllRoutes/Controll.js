const Workouts = require('../models/workoutsmodel')
const mongoose = require('mongoose')



// all workouts
    const GetallWorkouts = async (req, res) => {
        //we used async because the Worksouts in schema is async func by default i think
        const workouts = await Workouts.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    }


// get single workout
const GetSingleW = async (req, res) => {
    // const {id} = req.params;
            //or
    const id = req.params.id; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: "could not find the id" });
    }

    try {
        const workout = await Workouts.findById(id);

        if (!workout) {
            return res.status(404).json({ err: "could not find the id" });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ err: "server error" });
    }
};


// creat a new workout
    const CreatWorkout = async (req, res)=>{
        const {title, load, reps} = req.body

        let emptyFields = []
        if(!title){
            emptyFields.push('title')
        }
        if(!load){
            emptyFields.push('load')
        }
        if(!reps){
            emptyFields.push('reps')
        }
        if(emptyFields.length > 0){
            return res.status(400).json({error: 'Please fill in all fields', emptyFields})
        }
        // add doc for db
        try {
            const workout = await Workouts.create({title, load, reps})
            res.status(200).json(workout)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    } 

// delte a workout
    const DeleteWorkout = async (req, res) =>{
        const {id} = req.params; 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ err: "could not find work" });
        }

        try {
            const worksout = await Workouts.findOneAndDelete({_id: id})
            res.status(200).json(worksout)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

// update a workout
    const UpdateWorkout = async(req, res)=>{
        const {id} = req.params; 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ err: "could not find work" });
        }

        try {
            const worksout = await Workouts.findOneAndUpdate({_id: id}, {
                ...req.body
            })
            res.status(200).json(worksout)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }


module.exports ={
    CreatWorkout,
    GetallWorkouts,
    GetSingleW,
    DeleteWorkout,
    UpdateWorkout
}