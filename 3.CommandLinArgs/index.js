const yargs = require("yargs");

yargs.command('greet', 'greet a user', (yargs) => {
    yargs.option('name', {
        alias: 'n',
        description: 'Enter your name',
        type: 'string',
        demandOption: true
    })
}).help().argv;

const argv = yargs.argv;
console.log(argv)

if (argv._[0] == 'greet') {
    console.log('hello', argv.name)
}

// node index.js greet --n pranav



// const a = process.argv;
// console.log(a)