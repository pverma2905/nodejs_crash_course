const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on('alarm', (args1, args2) => {
    console.log(args1, args2)
})
emitter.on('alarm', () => {
    console.log("Another alarm emitter")
})
emitter.on('notification', () => {
    console.log("This is a notification")
})
emitter.emit('notification')
emitter.emit('alarm', '9AM', '12AM')
