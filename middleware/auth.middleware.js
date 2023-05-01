const jwt = require("jsonwebtoken");

const JWT_SECRET = "shhhhh"; // Use a constant for the secret string

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
      if (decoded) {
        console.log(decoded);
        req.body.authorId = decoded.authorId;
        req.body.author = decoded.author;
        next();
      } else {
        res.status(401).json({ error: "Invalid token" }); // Use res.status().json() for error responses
      }
    } catch (error) {
      res.status(401).json({ error: "Invalid token" }); // Use res.status().json() for error responses
    }
  } else {
    res.status(401).json({ error: "Token not found" }); // Use res.status().json() for error responses
  }
};

module.exports = { auth };
