const express = require("express");
const notesRouter = express.Router();
const { getNotes, createNote, getNoteById, updateNote, deleteNote, restrictId } = require("../controllers/notesController")
const {protectData} = require("../controllers/authController")
notesRouter.param('id', restrictId);

notesRouter.route('/').get(protectData,getNotes).post(createNote)
notesRouter.route('/:id').get(getNoteById).patch(updateNote).delete(deleteNote)

module.exports = notesRouter