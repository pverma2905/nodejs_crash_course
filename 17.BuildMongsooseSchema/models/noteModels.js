const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A note must have a title"],
        unique: true
    },
    description: {
        type: String
    },
    created_at: {
        type: date,
        default: Date.now()
    },
    updated_at: {
        type: date,
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