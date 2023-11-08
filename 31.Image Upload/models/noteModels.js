const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A note must have a title"],
        trim: true,
        unique: true,
        minLength: [5, "Note should have at least 5 character in title"],
        maxLength: [30, "Note Should have at most 30 character in title"]
        // enum: {             /* validate the enum
        //     values: ["abc", "bcd"],
        //     message: "Important can have only abc or bcd"
        // }
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
        default: false,
        //select: false      /* remove from get api
    },
    priority: {
        type: Number,
        validate: {
            validator: function (val) {
                return val >= 1 && val <= 10
            },
            message: "Priority value can only be b/w 1 to 10"
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    imagePath:String

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