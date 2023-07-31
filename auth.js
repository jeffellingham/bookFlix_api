
const jwtSecret = 'your_jwt_secret'; //Same as key used in JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport.js');


let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.username,     //Username I'm encoding in the JWT
        expiresIn: '7d',
        algorithm: 'HS256'  //Algorithm used to "sign" or encode the values of the JWT
    });
}


// POST login
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something just ain\'t right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}