const express = require("express");
const notesRouter = express.Router();
const { getNotes, createNote, getNoteById, updateNote, deleteNote, restrictId, getNoteByUser } = require("../controllers/notesController")
const {protectData, accessDelete} = require("../controllers/authController")
notesRouter.param('id', restrictId);

notesRouter.route('/').get(protectData,getNotes).post(protectData,createNote)
notesRouter.route('/user-notes').get(protectData,getNoteByUser)
notesRouter.route('/:id').get(protectData,getNoteById).patch(protectData,updateNote).delete(protectData,accessDelete("admin"),deleteNote)

module.exports = notesRouter