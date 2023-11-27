const express = require('express');
const {
    signUp,
    signIn,
    logout
} = require('../controllers/users.controllers.js');
const {authenticateJWT} = require('../middlewares/authMiddleware.js');

const users_router = express.Router();

users_router.post('/signup', signUp)
users_router.post('/signin', signIn)
users_router.post('/logout', logout)
users_router.post('/check-user', authenticateJWT, (req, res) => {
  const user_id = req.user.id;
  res.status(200).json({ message: 'The user is authenticate!',user_id});
})

module.exports = users_router;