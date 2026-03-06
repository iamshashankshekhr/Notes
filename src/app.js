require("dotenv").config

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const notesRouter = require('./routes/notes.route');
const authRoute = require("./routes/auth.route");
const cors = require('cors')


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))

app.use('/api/notes', notesRouter)
app.use('/api/auth', authRoute)
app.get('/', (req, res) => {
    res.send("Hello Notes")
})







module.exports = app;