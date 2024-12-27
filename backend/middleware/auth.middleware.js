const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied. No token provided." });
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      console.log(`decoded`,decoded)
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Token has expired." });
        }
        return res.status(401).json({ msg: "Token is not valid." });
      }
      if (decoded) {
        req.user = decoded;  
        next();

      }

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error." });
  }
};

module.exports = authMiddleware;
