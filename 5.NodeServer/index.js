const http = require("http");
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url
    if (url === '/' || url === '/home') {
        res.end("hello from the home route")
    } else if (url === '/about') {
        res.end("hello from the about route")
    }
    else if (url === '/api') {
        fs.readFile(`${__dirname}/data.json`, 'utf-8', (err, response) => {
            if (err) throw err;
            const data = JSON.parse(response)
            const str = data.id + " " + data.name;
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(str);
        })
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'custom-header': 'hello-world'
        })
        const html = fs.readFileSync('./template.html', 'utf-8')
        res.end(html);
    }

})

const port = 1501;
server.listen(port, 'localhost', () => {
    console.log(`server is running on port`, port)
})