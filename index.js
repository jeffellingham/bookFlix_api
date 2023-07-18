
const express = require('express'),
    morgan = require('morgan');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(morgan('common'));

// JSON
let topMovies = [
    { title: 'Eternal Sunshine Of The Spotless Mind', director: 'Michel Gondry'},
    { title: 'Gladiator', director: 'Ridley Scott'},
    { title: 'Die Hard', director: 'John McTiernan'},
    { title: 'The Empire Strikes Back', director: 'Irvin Kershner'},
    { title: 'The Dark Knight', director: 'Christopher Nolan'},
    { title: 'Snatch', director: 'Guy Ritchie'},
    { title: 'Spirited Away', director: 'Hayao Miyazaki'},
    { title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski'},
    { title: 'Iron Man', director: 'Jon Favreau'},
    { title: 'The Princess Bride', director: 'Rob Reiner'},
    { title: 'John Wick', director: 'Chad Stahelski'}
]

// GET requests
app.get('/', (req, res) => {
    res.send('Hello movie lover! Pop some corn, pop a squat, and pop on a flick.');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Error-handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Boooo, something broke!');
});

// Listen for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});