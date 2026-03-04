const express = require("express");
const router = express.Router();
const {createNote , getNote} = require("../controller/notes.controller")


router.post('/create', createNote)
router.get('/allnotes' , getNote)





module.exports = router;

