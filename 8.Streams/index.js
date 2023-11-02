const fs = require("fs");
const http = require('http');
// for (let i = 0; i < 1000; i++) {
//     fs.writeFileSync('./output.txt', 'Hello World\n', { flag: 'a' });
// }

http.createServer((req, res) => {
    const stream = fs.createReadStream('./output.txt', { encoding: 'utf-8', highWaterMark: 1000 });
    stream.on('open', () => {
        console.log('stream is open and can start reading the file')
        stream.pipe(res)
    })
    stream.on('end', () => {
        console.log('Finish reading the stream')
    })
}).listen(4000, 'localhost')