require("dotenv").config

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const notesRouter = require('./routes/notes.route')



app.use(express.json())
app.use(cookieParser())

app.use('/api/notes' , notesRouter)








module.exports = app;