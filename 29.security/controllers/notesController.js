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
        // filter
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(element => delete queryObj[element])
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ne)\b/g, match => `$${match}`)

        let query = Note.find(JSON.parse(queryStr));

        //sorting

        if (req.query.sort) {
            query = query.sort(req.query.sort.split(',').join(' '))
        } else {
            query = query.sort('created_at')
        }

        // limit the fields

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields.toString());
        } else {
            query = query.select("-__v")
        }

        // pagination

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 20;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        const notes = await query;
      

        return res.status(200).json({ message: "Success", data: { notes } });

    } catch (error) {
        return res.status(400).json({ status: "Failed", message: "Error in getting notes from DB " + error });
    }

}

exports.createNote = async (req, res) => {
    try {
        const newNote = await Note.create(req.body);
        return res.status(201).json({ message: 'success', data: { note: newNote } })
    } catch (error) {
        return res.status(400).json({ status: 'Failed', message: 'Error in creating new Note  ' + error })
    }


}

exports.getNoteById = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        return res.status(200).json({ message: 'success', data: { note } })
    } catch (error) {
        return res.status(400).json({ status: 'Failed', message: 'Note Id Does Not Exist ' + error })
    }
}

exports.updateNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        return res.status(200).json({ message: 'Success Note Has Been Updated', data: { note } })
    } catch (error) {
        return res.status(400).json({ status: 'Failed', message: 'Note Id Does Not Exist ' + error })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Success Note Has Been Deleted', data: { note } })
    } catch (error) {
        return res.status(400).json({ status: 'Failed', message: 'Note Id Does Not Exist ' + error })
    }
}