const crypto = require('crypto');
const EventEmitter = require('node:events')

const emitter = new EventEmitter()

emitter.on('notification', (body, time) => {
    console.log(`Submit notification with text ${body} and time ${time}`)
})

setInterval(() => {
    emitter.emit('notification', crypto.randomBytes(64).toString('hex'), new Date())
}, 2000)
