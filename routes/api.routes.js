const express = require('express');
const multer = require('multer');
const fs = require('node:fs');
const { OpenAI } = require('openai');
require("dotenv").config();
const {authenticateJWT} = require('../middlewares/authMiddleware.js');
const { v4: uuidv4 } = require('uuid');

const {
    _uploadData
} = require('../models/data.models.js');

const api_router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
});

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads/', // Set the destination folder for uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for file upload
api_router.post('/upload/:userId', authenticateJWT, upload.single('audioFile'), async (req, res) => {
  try {
    const filePath = req.file.path;
    // console.log(filePath);

    // Call the transcription function with the file path
    const transcript = await transcription(filePath);
    const summary = await summarize(transcript);

    // Delete the file after successful processing
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

    const title = req.query.title;

    const data = {
        id: uuidv4(),
        user_id: req.params.userId,
        title,
        transcription:transcript,
        summary
    }

    try {
        const uploadingData = await _uploadData(data);
        res.status(200).json({msg:'The data was successfuly uploaded !'})
    } catch (err) {
        console.log(err)
        res.status(404).json({msg:'Error occured with the data, please try again'})
    }

  } catch (error) {
    // console.error('Error during file upload:', error.message);
    res.status(500).json({ error: error.message });
  }
});

async function transcription(filePath) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: 'whisper-1',
  });

  return transcription.text;
}

async function summarize(text) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `summarize this transcription in his own language : ${text}` }],
    model: 'gpt-3.5-turbo-16k',
  });

  return chatCompletion.choices[0].message.content;
}

module.exports = api_router;