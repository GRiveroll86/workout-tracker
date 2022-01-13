const router = require('express').Router();
const db = require('../models');

router.get('/api/workouts', (req, res) => {
    db.Workout.aggregate([
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ])
    .then(response => {
        res.json(response);
    })
    .catch(err => { 
        res.json(err) 
    })
});

router.get('/api/workouts/range', (req, res) => {
    db.Workout.aggregate([
        {$sort: {day: -1}},
        {$limit: 7},
        {$addFields: { totalDuration: { $sum: '$exercises.duration'}}}
    ])
    .then(response => {
        res.json(response);
    })
    .catch(err => { 
        res.json(err) 
    })
});

router.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body)
    .then(response => {
        res.json(response)
    })
    .catch(err => { 
        res.json(err) 
    })
});

router.put('/api/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        {_id: req.params.id},
        {exercises: req.body}
    )
    .then(response => {
        res.json(response);
    })
    .catch(err => { 
        res.json(err) 
    })
});

module.exports = router;