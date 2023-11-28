const {
    _signUp,
    _checkEmail,
    _signIn,
} = require('../models/users.models.js');

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Check if email exist 

const checkEmail = async (email) => {
    try {
        const res = await _checkEmail(email)
        if (res.length == 0) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
};

// SignUp

const signUp = async (req,res) => {
    const {email,password} = req.body;
    console.log(req.body)
    const emailStatus = await checkEmail(email);
    if (emailStatus) {
        try { 
        const hash_password = await hashPassword(password)
            try { 
                const id = uuidv4();
                const data = await _signUp(id,email,hash_password);
                
                // Generate a JWT for the new user
                const token = jwt.sign({ id, email }, process.env.JWT_KEY, {
                expiresIn: '3d', // Token expires in 3 days
                });

                // Set the JWT as an HTTP cookie
                // res.cookie('token', token, { httpOnly: true });               
                res.status(200).json({msg:'The account was successfuly created !',user_id:data[0].id,token:token})
            } catch (err) {
                console.log(err)
                res.status(404).json({msg:'Error occured, please try again'})
            }
        } catch (err) {
        console.log(err)
        res.status(404).json({msg:'Error occured, please try again'})
        }
    } else {
        res.status(404).json({msg:'This email already exist!'})
    }
};

// Function to encrypt the password

async function hashPassword(plainTextPassword) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  return hashedPassword;
}

// SignIn

const signIn = async (req,res) => {
    const {email,password} = req.body;
    try { 
        const data = await _signIn(email);
        // check length of the array to verify that the email exist 
        if (data.length == 0) {
            return res.status(404).json({msg:"Sorry, this email doesn't exist!"})
        }
        try {
            const isMatch = await comparePasswords(password,data[0].password)
            if (isMatch) {
                // Generate a JWT for the new user
                const token = jwt.sign({ id:data[0].id, email }, process.env.JWT_KEY, {
                expiresIn: '3d', // Token expires in 3 days
                });
                console.log("token",token)
                // Set the JWT as an HTTP cookie
                // res.cookie('token', token, { httpOnly: true });               
                res.status(200).json({msg:'Successfuly login !',user_id:data[0].id,token:token})
            } else {
                res.status(404).json({msg:"Password wrong!"})
            }
        } catch (err) {
            console.log(err)
            res.status(404).json({msg:'Error occured, please try again'})
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({msg:'Error occured, please try again'})
    }
};

// Function to check the password

async function comparePasswords(plainTextPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
  return isMatch;
};

const logout = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    signUp,
    signIn,
    logout
}