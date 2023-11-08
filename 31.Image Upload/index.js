const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const app = express();


app.use(express.json({limit:"10kb"}))
app.use(morgan('dev'))
app.use(helmet());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: "Too may request from this ip, please try again in 15 minutes"
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use("/api", limiter)
app.use(sanitize());
app.use(xss());




const notesRouter = require("./routes/notesRoutes")
const usersRouter = require("./routes/userRoutes")

// console.log(process.env)
app.use(express.static(`${__dirname}/public`))

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.all('*', (req, res) => {
    res.status(200).send(`<h1>404 | NOT FOUND</h1>`);
})

module.exports = app