const express = require("express");
const morgan = require("morgan");
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid")

app.use(express.json())
app.use(morgan('dev'))


// notes routes
const getNotes = (req, res) => {
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/notes.json`))
    res.status(200).json({ message: "Success", data: { tours } });
}

const createNote = (req, res) => {
    const newId = uuidv4();
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/notes.json`));
    const newNote = Object.assign({ _id: newId }, req.body)
    notes.push(newNote)
    fs.writeFile(`${__dirname}/notes.json`, JSON.stringify(notes), (err) => {
        if (err) throw err
        res.status(201).json({ message: 'success', data: { newNote } })
    })
}

const getNoteById = (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/notes.json`));
    const id = req.params.id;
    console.log("id", id)
    const note = notes.find(note => note._id === id);
    if (note) {
        res.status(200).json({ message: 'success', data: { note } })
    } else {
        res.status(400).json({ message: 'Note id Does not exist' })
    }
}

const updateNote = (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/notes.json`));
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
    fs.writeFile(`${__dirname}/notes.json`, JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.status(201).json({ message: "Success Note is updated", data: { notes } })
    })
}

const deleteNote = (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/notes.json`));
    const id = req.params.id;
    console.log("id", id)
    const note = notes.find((note) => note._id === id);
    const noteIndex = notes.findIndex((note) => note._id === id);
    console.log("noteIndex", noteIndex)
    if (!note) return res.status(400).json({ message: 'Note id Does not exist' });
    notes.splice(noteIndex, 1);
    fs.writeFile(`${__dirname}/notes.json`, JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.status(200).json({ message: "Success Note is deleted", data: { notes } })
    })
}

const notesRouter = express.Router();
app.use('/api/notes', notesRouter)

notesRouter.route('/').get(getNotes).post(createNote)
notesRouter.route('/:id').get(getNoteById).patch(updateNote).delete(deleteNote)

// app.get('/api/notes', getNotes)
// app.post('/api/notes', createNote)
// app.get('/api/notes/:id', getNoteById)
// app.patch('/api/notes/:id', updateNote)
// app.delete('/api/notes/:id', deleteNote)

//user routes
const getAllUsers = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}
const createUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}
const getUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}
const updateUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}
const deleteUser = (req, res) => {
    res.status(500).json({ status: 'error', message: "This route is not yet defined" })
}

const usersRouter = express.Router();
app.use('/api/users', usersRouter)

usersRouter.route('/').get(getAllUsers).post(createUser)
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

app.all('*', (req, res) => {
    res.status(200).send(`<h1>404 | NOT FOUND</h1>`);
})

app.listen(4000, () => {
    console.log(`Server is running on port no :4000`)
})