
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    morgan = require('morgan');

// Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

// JSON
let users = [
    {
        id: 1,
        name: "Lydia",
        favoriteMovies: ["Die Hard", "Eternal Sunshine of the Spotless Mind"]
    },
    {
        id: 2,
        name: "Mingo",
        favoriteMovies: ["Iron Man", "The Dark Knight"]
    }
]

let movies = [
    { 
        title: 'Eternal Sunshine of the Spotless Mind', 
        description: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories for ever.',
        director: {
            name: 'Michel Gondry',
            bio: 'Michel Gondry is a French filmmaker noted for his inventive visual style and distinctive manipulation of mise en scène. Along with Charlie Kaufman, he won an Academy Award for Best Original Screenplay as one of the writers of the 2004 film Eternal Sunshine of the Spotless Mind, which he also directed.',
            born: '1963'
        },
        writer: 'Charlie Kaufman, Michel Gondry',
        genre: {
            name: 'Romance',
            description: 'Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship or marriage is featured.'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png'
    },
    { 
        title: 'Gladiator', 
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        director: {
            name: 'Ridley Scott',
            bio: 'Sir Ridley Scott is an English film director and producer. Best known for directing films in the science fiction, crime, and historical drama genres, his work is known for its atmospheric and highly concentrated visual style.',
            born: '1937'
        },
        writer: 'David Franzoni, John Logan, William Nicholson',
        genre: {
            name: 'Historical',
            description: 'Films that either provide more-or-less accurate representations of historical accounts or depict fictional narratives placed inside an accurate depiction of a historical setting.'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png'
    },
    { 
        title: 'Die Hard', 
        description: 'A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.',
        director: {
            name: 'John McTiernan',
            bio: 'John Campbell McTiernan Jr. is an American filmmaker. He is best known for his action films, including Predator, Die Hard, and The Hunt for Red October.',
            born: '1951'
        },
        writer: 'Roderick Thorp, Jeb Stuart, Steven E. de Souza',
        genre: {
            name: 'Action',
            description: 'Should contain numerous scenes where action is spectacular and usually destructive. Often includes non-stop motion, high energy physical stunts, chases, battles, and destructive crises (floods, explosions, natural disasters, fires, etc.).'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/c/ca/Die_Hard_%281988_film%29_poster.jpg'
    },
    { 
        title: 'The Empire Strikes Back',
        description: 'After the Rebels are overpowered by the Empire, Luke Skywalker begins his Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
        director: {
            name: 'Irvin Kershner',
            bio: 'Irvin Kershner was an American film director, actor, and producer of film and television. He gained notice early in his career as a filmmaker for directing quirky, independent drama films, while working as an influential lecturer at the University of Southern California.',
            born: '1923',
            died: '2010'
        },
        writer: 'George Lucas, Lawrence Kasdan, Leigh Brackett',
        genre: {
            name: 'Sci-Fi',
            description: 'Science fiction is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. Science fiction can trace its roots to ancient mythology.'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg'
    },
    { 
        title: 'The Dark Knight', 
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        director: {
            name: 'Christopher Nolan',
            bio: 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.',
            born: '1970'
        },
        writer: 'Jonathan Nolan, Christopher Nolan',
        genre: {
            name: 'Action',
            description: 'Should contain numerous scenes where action is spectacular and usually destructive. Often includes non-stop motion, high energy physical stunts, chases, battles, and destructive crises (floods, explosions, natural disasters, fires, etc.).'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg'
    },
    { 
        title: 'Snatch', 
        description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
        director: {
            name: 'Guy Ritchie',
            bio: 'Guy Stuart Ritchie is an English film director, producer and screenwriter. His work includes British gangster films, and the Sherlock Holmes films starring Robert Downey Jr. Ritchie left school at age 15 and worked entry-level jobs in the film industry before going on to direct television commercials.',
            born: '1968'
        },
        writer: 'Guy Ritchie',
        genre: {
            name: 'Drama',
            description: 'Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Snatch_ver4.jpg'
    },
    { 
        title: 'Spirited Away', 
        description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts.',
        director: {
            name: 'Hayao Miyazaki',
            bio: 'Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.',
            born: '1941'
        }, 
        writer: 'Hayao Miyazaki',
        genre: {
            name: 'Animation',
            description: 'A film medium in which the film\'s images are primarily created by computer or hand and the characters are voiced by actors. Animation can incorporate any genre and subgenre.'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png'
    },
    { 
        title: 'The Matrix', 
        description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
        director: {
            name: 'Lana Wachowski, Lilly Wachowski',
            bio: 'Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. After the siblings dropped out of college, they started a construction business and wrote screenplays.',
            born: '1967, 1965'
        }, 
        writer: 'Lana Wachowski, Lilly Wachowski',
        genre: {
            name: 'Sci-Fi',
            description: 'Science fiction is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. Science fiction can trace its roots to ancient mythology.'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg'
    },
    { 
        title: 'The Princess Bride', 
        description: 'A bedridden boy\'s grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.',
        director: {
            name: 'Rob Reiner',
            bio: "Robert Reiner is an American actor and filmmaker. As an actor, Reiner first came to national prominence with the role of Michael \"Meathead\" Stivic on the CBS sitcom All in the Family, a performance that earned him two Primetime Emmy Awards.",
            birth: "1947"
        },
        writer: 'William Goldman',
        genre: {
            name: 'Adventure',
            description: 'Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative.'
        },
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/d/db/Princess_bride.jpg'
    },
    { 
        title: 'John Wick', 
        description: 'An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.',
        director: {
            name: 'Chad Stahelski',
            bio: 'Chad Stahelski is an American stuntman and film director. He directed the 2014 film John Wick and its three sequels. He has worked as a stuntman, stunt coordinator and second unit director on several films.',
            born: '1968'
        },
        writer: 'Derek Kolstad',
        genre: {
            name: 'Action',
            description: 'Should contain numerous scenes where action is spectacular and usually destructive. Often includes non-stop motion, high energy physical stunts, chases, battles, and destructive crises (floods, explosions, natural disasters, fires, etc.).'
        },
        imageURL: 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg'
    }
]

// READ / GET Homepage --> is this needed??
app.get('/', (req, res) => {
    res.send('Hello movie lover! Pop some corn, pop a squat, and pop on a flick.');
});

// READ / GET all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// READ / GET a single movie by title
app.get('/movies/:title', (req, res) => {
    // const title = req.params.title;
    // ^Equivalent to object destructuring below, where variable name is also the far-right part of property.
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No movie by that title.')
    }
});

// READ / GET data on genre by name
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.genre.name === genreName ).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No genre by that name');
    }
});

// READ / GET data on director by name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('No director by that name');
    }
});

// POST / CREATE account for a new user
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Users need at least a name!')
    }
});

// UPDATE user's account info (only username?)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('User not found.');
    }
});

// CREATE new movie on user's favorites list --> This could also be a PUT/UPDATE method
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to ${user.name}'s favorites list.`)
    } else {
        res.status(400).send('User not found.')
    }
});

// GET a user's favorites list
app.get('/users/:id/favorites', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        res.status(200).json(user.favoriteMovies);
    } else {
        res.status(400).send('User not found.')
    }
})

// DELETE movie from user's favorites list
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( movie => movie !== movieTitle );
        res.status(200).send(`${movieTitle} has been removed from ${user.name}'s favorites list.`)
    } else {
        res.status(400).send('User not found.')
    }
});

// DELETE user's account
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id );
        // res.json(users);
        res.status(200).send(`${user.name}'s account has been deleted.`)
    } else {
        res.status(400).send('User not found.')
    }
})



// Error-handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Boooo, something broke!');
});

// Listen for request
app.listen(8080, () => {
    console.log('App is listening on port 8080.');
});