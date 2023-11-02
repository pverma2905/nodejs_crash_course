const fs = require("fs");
//Synchronous Code start

// const data = fs.readFileSync('./data.txt', 'utf-8');
// console.log(data);

// const addData = `Adding this is a new content in a new file. ${data}\n this is created on  ${Date.now()}`;
// fs.writeFileSync('./output.txt', addData); 

//Asynchronous Code start

fs.readFile('./data.txt', 'utf-8', function (err, data) {
    if (err) throw err
    console.log(data);
    const addData = `Adding this is a new content in a new file. ${data}\n this is created on  ${Date.now()}`;
    fs.writeFile('./output.txt', addData, function (err2) {
        if (err2) throw err;
    });
})


