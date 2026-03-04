const jwt = require('jsonwebtoken')
const usermodel = require('../model/user.model')
const notesmodel = require('../model/notes.model')
async function createNote(req , res) {
    const {title , content} = req.body ;
    const token = req.cookies.token;
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await usermodel.findById(decoded.id)
        if(!user){
            res.status(200).json({message : "User not found"})
        }
        const notes = await notesmodel.create({title , content , user : user._id})
        res.status(200).json({message : "Note created" , notes : notes})
    }
    catch(err){
        console.log(err)
    }
    
}


async function getNote(req , res) {
    const token = req.cookies.token 
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await usermodel.findById(decoded.id)
        if(!user){
            res.status(200).json({message : "User not found"})
        }
        const notes = await notesmodel.find({user : user._id})

        res.status(200).json({message: "Notes find" , notes : notes})


    }catch(err){
        console.log('Something Wrong' , err)
    }

    
}


module.exports = {createNote , getNote}