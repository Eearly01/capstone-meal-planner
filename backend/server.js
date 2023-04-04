// Requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use('/recipe', require('./routes/recipeRoute'))
app.use('/user', require('./routes/userRoutes'))
app.use('/goal', require('./routes/goalRoutes'))

// Mongoose / MongoDB

mongoose.connect(process.env.MONGODB);
mongoose.connection.once('open', () => {
	console.log('connected to mongoDB');
});

// Listen - Broadcast
app.listen(process.env.PORT, () => {
	console.log('the server is listening......');
});
