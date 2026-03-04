const express = require("express");
const router = express.Router();
const {createNote , getNote , updateNote} = require("../controller/notes.controller")


router.post('/create', createNote)
router.get('/allnotes' , getNote)
router.put('/update/:id' , updateNote)





module.exports = router;

