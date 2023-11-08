const express = require("express");
const multer = require("multer");
const notesRouter = express.Router();
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, res, next) {
        next(null, "public/uploads/images")
    },
    filename: (req, file, next) => {
       const uniqueSuffix = Date.now();
       const extension = path.extname(file.originalname);
       const filename = file.fieldname + '-'+ uniqueSuffix + extension;
       next(null,filename);
    }
})
const upload = multer({storage});



const { getNotes, createNote, getNoteById, updateNote, deleteNote, restrictId, getNoteByUser, createNoteWithImage } = require("../controllers/notesController")
const {protectData, accessDelete} = require("../controllers/authController")
notesRouter.param('id', restrictId);

notesRouter.route('/').get(protectData,getNotes).post(protectData,createNote)
notesRouter.route('/upload-image').post(protectData, upload.single("image") ,createNoteWithImage)
notesRouter.route('/user-notes').get(protectData,getNoteByUser)
notesRouter.route('/:id').get(protectData,getNoteById).patch(protectData,updateNote).delete(protectData,accessDelete("admin"),deleteNote)

module.exports = notesRouter