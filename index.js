
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://127.0.0.1/bookFlixDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let auth = require('./auth.js')(app);

const passport = require('passport');
require('./passport.js');

// CRUD:

// READ: GET Homepage
app.get('/', (req, res) => {
    res.send('Hello movie lover! Pop some corn, pop a squat, and pop on a flick.');
});

// READ: GET all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
});

// READ: GET a single movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ title: req.params.title })
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('No movie by that title. Error: ' + err);
        })
});

// READ: GET all movies with a specific actor
app.get('/movies/actors/:actor', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // await Movies.find({ actors: { $in: [req.params.actor]} })
    await Movies.find({ actors:  req.params.actor })
        .then((moviesWithActor) => {
            res.status(200).json(moviesWithActor);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('No movies with that actor. Error: ' + err);
        })
});

// READ: GET all movies of a genre
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find({ "genre.name": req.params.genreName })
        .then((genreMovies) => {
            res.status(200).json(genreMovies);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send("No movies of that genre. Error: " + err);
        })
});

// READ: GET data on genre by name
app.get('/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "genre.name": req.params.genreName })
        .then((genreMovies) => {
            res.status(200).json(genreMovies.genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send("No genre of that name. Error: " + err);
        })
});

// READ: GET all movies by specific director
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find({ "director.name": req.params.directorName })
        .then((moviesdirected) => {
            res.status(200).json(moviesdirected);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('No movies by that director. Error: ' + err);
        })
});

// READ: GET data on director by name
app.get('/directors/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "director.name": req.params.directorName })
        .then((moviesdirected) => {
            res.status(200).json(moviesdirected.director);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('No movies by that director. Error: ' + err);
        })
});

// READ all users
// app.get('/users', async (req, res) => {
//     await Users.find()
//     .then((users) => {
//         res.status(200).json(users);
//     })
//     .catch((err) => {
//         res.status(500).send('Error: ' + err);
//     });
// });

// CREATE: account for a new user
app.post('/users', async (req, res) => {
    await Users.findOne({ username: req.body.username })
        .then((user) => {
            if(user) {
                return res.status(400).send(req.body.username + ' already exists.');
            }else {
                Users.create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    birthday: req.body.birthday
                })
                .then((user) => {
                    res.status(201).json(user) 
                })
                .catch((error) => {
                    console.error(error);
                    res.status(400).send('Error: ' + error);
              })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// UPDATE: user's account info (only username?)
app.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(req.user.username !== req.params.username){
        return res.status(400).send('Permission denied, you sneaky devil.');
    }
    await Users.findOneAndUpdate({ username: req.params.username }, { $set:
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
        }
    },
    { new: true }) //This line ensures updated document is returned
    .then((updatedUser) => {
        if (!updatedUser) {
            res.status(400).send('No user by name of ' + req.params.username);
        } else {
            res.status(201).json(updatedUser);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(400).send('Something went wrong. Error: ' + err);
    })
});

// CREATE: new movie on user's favorites list --> This could also be a PUT/UPDATE method
app.post('/users/:username/:movieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username }, {
        $push: { favoriteMovies: req.params.movieID }
    },
    { new: true })
    .then((updatedUser) => {
        if (!updatedUser) {
            res.status(400).send('No user by name of ' + req.params.username);
        } else {
            res.status(201).json(updatedUser);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(400).send('Something went wrong. Error: ' + err);
    })
});

// READ: a user's favorites list (returns movie IDs)
app.get('/users/:username/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOne({ username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.username + ' was not found.');
            } else {
                // Users.aggregate( [ {
                //     $lookup:
                //         {
                //             from: "Movies",
                //             localField: "user.favoriteMovies",
                //             foreignField: "_id",
                //             as: "movieList"
                //         }
                // }])
                //let userFavorites = Movies.find({ _id: user.favoriteMovies })
                res.status(200).json(user.favoriteMovies);
            }
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
})

// DELETE: movie from user's favorites list
app.delete('/users/:username/:movieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username }, {
        $pull: { favoriteMovies: req.params.movieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.status(201).json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(400).send('Something went wrong. Error: ' + err);
    })
});

// DELETE: user's account
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndRemove({ username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.username + ' was not found.');
            } else {
                res.status(200).send(req.params.username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('Something went wrong. Error: ' + err);
        });
});



// Error-handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Boooo, something broke!');
});

// Listen for request
app.listen(8080, () => {
    console.log('App is listening on port 8080.');
});