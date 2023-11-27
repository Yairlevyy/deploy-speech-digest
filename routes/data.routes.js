const express = require('express')
const {
    getDataByUserId,
    getDataById,
    deleteDataById
} = require('../controllers/data.controllers.js')
const {authenticateJWT} = require('../middlewares/authMiddleware.js');

const data_router = express.Router();

data_router.get('/get-data-by-user-id/:userId', authenticateJWT, getDataByUserId)
data_router.get('/get-data-by-id/:id', authenticateJWT, getDataById)
data_router.delete('/delete-data-by-id/:id', authenticateJWT, deleteDataById)

module.exports = data_router;