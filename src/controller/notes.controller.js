const jwt = require('jsonwebtoken')
const usermodel = require('../model/user.model')
const notesmodel = require('../model/notes.model')
async function createNote(req, res) {
    const { title, content } = req.body;
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await usermodel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: "Login First" });
        }
        const notes = await notesmodel.create({ title, content, user: user._id })
        res.status(201).json({ message: "Note created", notes: notes })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getNote(req, res) {
    const token = req.cookies.token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await usermodel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: "Login First" });
        }
        const notes = await notesmodel.find({ user: user._id })

        res.status(200).json({ message: "Notes retrieved successfully", notes: notes })


    } catch (err) {
        console.log('Something Wrong', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateNote(req, res) {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
        const token = req.cookies.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Login First" });
        }

        const notes = await notesmodel.findOneAndUpdate(
            { _id: id, user: user._id },
            { title, content },
            { new: true }
        );

        if (!notes) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.status(200).json({ message: "Note Updated", notes });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { createNote, getNote, updateNote }