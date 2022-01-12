const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const workoutRoutes = require('./controllers/workouts');

const PORT = process.env.PORT || 3001;

// const Workouts = require('./models/workoutModels');
// const Exercises = require('./models/exerciseModels');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workouts', { useNewUrlParser: true });

app.use('/api', workoutRoutes);

// app.get('/', async (req, res) => {
//     console.log('front page')
// });

app.get('/exercise', async (req, res) => {
    res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', async (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});