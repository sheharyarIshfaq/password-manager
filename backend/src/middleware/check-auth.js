const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = { id: decodedToken.id };
  } catch (error) {
    return res.status(401).json({ error: " Authentication failed!" });
  }
  next();
};

module.exports = auth;
