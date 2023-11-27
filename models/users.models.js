const db = require('../config/users.js')

// Sign Up

const _signUp = (id,email,password) => {
    return db('users').insert({id,email,password},["id"]);
}

// Check if email exist

const _checkEmail = (email) => {
    return db('users').select('email').where({email})
}

// Sign In

const _signIn = (email) => {
    return db('users').select('id','email','password').where({email})
}

// Export

module.exports = {
    _signUp,
    _checkEmail,
    _signIn
}