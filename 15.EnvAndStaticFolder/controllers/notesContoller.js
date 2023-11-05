const fs = require('fs');
const { v4: uuidv4 } = require("uuid")


exports.restrictId = (req, res, next, val) => {
    if (val == 789) return res.send('This id is restricted');
    next();
}


// notes routes
exports.getNotes = (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/../notes.json`))
    res.status(200).json({ message: "Success", data: { notes } });
}

exports.createNote = (req, res) => {
    const newId = uuidv4();
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/../notes.json`));
    const newNote = Object.assign({ _id: newId }, req.body)
    notes.push(newNote)
    fs.writeFile(`${__dirname}/../notes.json`, JSON.stringify(notes), (err) => {
        if (err) throw err
        res.status(201).json({ message: 'success', data: { newNote } })
    })
}

exports.getNoteById = (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/../notes.json`));
    const id = req.params.id;
    console.log("id", id)
    const note = notes.find(note => note._id === id);
    if (note) {
        res.status(200).json({ message: 'success', data: { note } })
    } else {
        res.status(400).json({ message: 'Note id Does not exist' })
    }
}

exports.updateNote = (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/../notes.json`));
    const id = req.params.id;
    const newData = req.body;
    const note = notes.find((note) => note._id === id);
    const noteIndex = notes.findIndex((note) => note._id === id);
    console.log("xxx", note)
    console.log("yyy", noteIndex)
    if (!note) return res.status(400).json({ message: 'Note id Does not exist' });
    for (const [key, value] of Object.entries(newData)) {
        console.log(note[key] + "ccccc" + value)
        note[key] = value
    }
    // notes[noteIndex] = note;
    fs.writeFile(`${__dirname}/../notes.json`, JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.status(201).json({ message: "Success Note is updated", data: { notes } })
    })
}

exports.deleteNote = (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/../notes.json`));
    const id = req.params.id;
    console.log("id", id)
    const note = notes.find((note) => note._id === id);
    const noteIndex = notes.findIndex((note) => note._id === id);
    console.log("noteIndex", noteIndex)
    if (!note) return res.status(400).json({ message: 'Note id Does not exist' });
    notes.splice(noteIndex, 1);
    fs.writeFile(`${__dirname}/../notes.json`, JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.status(200).json({ message: "Success Note is deleted", data: { notes } })
    })
}