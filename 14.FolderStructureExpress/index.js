const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json())
app.use(morgan('dev'))

const notesRouter = require("./routes/notesRoutes")
const usersRouter = require("./routes/userRoutes")

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.all('*', (req, res) => {
    res.status(200).send(`<h1>404 | NOT FOUND</h1>`);
})

module.exports = app