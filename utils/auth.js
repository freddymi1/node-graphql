const jwt = require('jsonwebtoken');

const createJwtToken = (user) => {
    return jwt.sign({user}, process.env.JWT_KEY, {
        expiresIn: "10h",
    });
}

module.exports = { createJwtToken }