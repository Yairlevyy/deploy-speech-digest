const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to verify JWTs
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token || req.body.token || req.query.token
  // console.log("token-body-auth",token)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  };

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    };

    req.user = user;
    next();
  });
}

module.exports = {
    authenticateJWT
};
