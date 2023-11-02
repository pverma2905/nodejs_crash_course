const express = require("express");
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid")

app.use(express.json())

app.get('/api/notes', (req, res) => {
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/notes.json`))
    res.status(200).json({ message: "Success", data: { tours } });
})
app.post('/api/notes', (req, res) => {
    const newId = uuidv4();
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/notes.json`));
    const newNote = Object.assign({ _id: newId }, req.body)
    console.log("mmmmmmm", newNote)
    notes.push(newNote)
    fs.writeFile(`${__dirname}/notes.json`, JSON.stringify(newNote), (err) => {
        if (err) throw err
        res.status(201).json({ message: 'success', data: notes })
    })
    // res.send("You can send the post request to this end point")
})

app.all('*', (req, res) => {
    res.status(200).send(`<h1>404 | NOT FOUND</h1>`);
})

app.listen(4000, () => {
    console.log(`Server is running on port no :4000`)
})