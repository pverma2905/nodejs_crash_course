const express = require("express");
const notesRouter = express.Router();
const { getNotes, createNote, getNoteById, updateNote, deleteNote, restrictId } = require("../controllers/notesContoller")

notesRouter.param('id', restrictId);

notesRouter.route('/').get(getNotes).post(createNote)
notesRouter.route('/:id').get(getNoteById).patch(updateNote).delete(deleteNote)

module.exports = notesRouter