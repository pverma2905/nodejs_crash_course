const fs = require('fs');
const { v4: uuidv4 } = require("uuid")
const Note = require("../models/noteModels")

exports.restrictId = (req, res, next, val) => {
    if (val == 789) return res.send('This id is restricted');
    next();
}


// notes routes
exports.getNotes = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(element => delete queryObj[element])

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ne)\b/g, match => `$${match}`)
        console.log("xxx", queryStr)

        const notes = await Note.find(JSON.parse(queryStr));
        res.status(200).json({ message: "Success", data: { notes } });

    } catch (error) {
        res.status(400).json({ status: "Failed", message: "Error in getting notes from DB " + error });
    }

}

exports.createNote = async (req, res) => {
    try {
        const newNote = await Note.create(req.body);
        res.status(201).json({ message: 'success', data: { note: newNote } })
    } catch (error) {
        res.status(400).json({ status: 'Failed', message: 'Error in creating new Note  ' + error })
    }


}

exports.getNoteById = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        res.status(200).json({ message: 'success', data: { note } })
    } catch (error) {
        res.status(400).json({ status: 'Failed', message: 'Note Id Does Not Exist ' + error })
    }
}

exports.updateNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json({ message: 'Success Note Has Been Updated', data: { note } })
    } catch (error) {
        res.status(400).json({ status: 'Failed', message: 'Note Id Does Not Exist ' + error })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndDelete(id);
        res.status(200).json({ message: 'Success Note Has Been Deleted', data: { note } })
    } catch (error) {
        res.status(400).json({ status: 'Failed', message: 'Note Id Does Not Exist ' + error })
    }
}