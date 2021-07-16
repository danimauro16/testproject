const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) reject('Token error');
            resolve(token);
        });
    });
};

module.exports = {
    generateJWT
}