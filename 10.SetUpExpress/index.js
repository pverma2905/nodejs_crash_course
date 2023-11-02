const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello From express", data: [] });
})
app.post('/', (req, res) => {
    res.status(200).json({ message: "Hello From express", data: [] });
})
app.all('*', (req, res) => {
    res.status(200).send(`<h1>404 | NOT FOUND</h1>`);
})
// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Hello From express", data: [] });
// })

app.listen(4000, () => {
    console.log(`Server is running on port no :4000`)
})