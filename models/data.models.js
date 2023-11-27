const db = require('../config/users.js')

// Upload new data

const _uploadData = (data) => {
    return db('data').insert(data)
}

// Get data by user id

const _getDataByUserId = (user_id) => {
    return db('data').select('id','transcription','summary','title').where({user_id})
}

// Get data by id

const _getDataById = (id) => {
    return db('data').select('transcription','summary').where({id})
}

// Delete data by id

const _deleteDataById = (id) => {
    return db('data').where({ id }).del();
}

module.exports = {
    _uploadData,
    _getDataByUserId,
    _getDataById,
    _deleteDataById
}

