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

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

notesSchema.virtual('descriptionLength').get(function () {
    return this.description.length;
})

//Doc middleware
notesSchema.pre('save', function (next) {
    console.log("Saving...")
    this.start = Date.now();
    next();
})
notesSchema.post('save', function (doc, next) {
    const queryTime = Date.now() - this.start;
    console.log(queryTime)
    next();
})
notesSchema.pre(/^find/, function (next) {
    console.log("finding data ....")
    next();
})

const Note = mongoose.model('Note', notesSchema);
module.exports = Note;