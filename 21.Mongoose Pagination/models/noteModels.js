const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A note must have a title"],
        trime: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    important: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number
    }

})

const Note = mongoose.model('Note', notesSchema);
module.exports = Note;