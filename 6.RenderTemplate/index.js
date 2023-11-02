const http = require("http");
const fs = require('fs');
const ejs = require('ejs');

const student = {
    name: 'Umair',
    class: 'BSCS',
    contact: '1234567890'
}

const server = http.createServer((req, res) => {
    const url = req.url
    if (url === '/') {
        fs.readFile('./template.ejs', 'utf-8', (err, template) => {
            const renderedHTML = ejs.render(template, { student: student });
            res.setHeader('Content-Type', 'text/html')
            res.end(renderedHTML)
        })

    }
})
const port = 1501;
server.listen(port, 'localhost', () => {
    console.log(`server is running on port`, port)
})