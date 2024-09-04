require('dotenv').config()
const express = require('express')
const WorkoutsRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const cors = require('cors')
//express app 
const app = express()

// middleware
app.use(express.json())  // for req post and update
app.use(cors())

app.use((req, res, next)=> {
    next() //this will launch the server data
})

// routes
app.use('/api/workouts/' ,WorkoutsRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    // listen for req
    app.listen(process.env.PORT, ()=>{
    
})
})
.catch((err)=>{
    console.log(err);
})

