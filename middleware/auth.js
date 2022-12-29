const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || ""

    try{
        const verified = jwt.verify(token, process.env.JWT_KEY);
        // const decoded = jwt.decode(token, process.env.JWT_KEY);

        req.verifiedUser = verified.user;
        console.log("Verification effectué avec succes!", verified);
        next();
    } catch (err) {
        console.log("Erreur de verification", err);
        next();
    }
}

module.exports = { authenticate }