require('dotenv').config();
const express = require('express');
const WorkoutsRoutes = require('./routes/workouts');
const mongoose = require('mongoose');
const cors = require('cors');

// express app
const app = express();

// middleware
app.use(express.json()); // for req post and update

// CORS configuration to allow requests from specific origins
const allowedOrigins = ['http://localhost:5173', 'https://mern-workout-tut-semm.vercel.app/'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Handle preflight requests
app.options('*', cors());

// routes
app.use('/api/workouts/', WorkoutsRoutes);

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for req
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
