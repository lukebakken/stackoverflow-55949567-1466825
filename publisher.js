const amqp = require('amqplib')
const open = amqp.connect('amqp://localhost');
const queue = 'hello'

var conn = null;
open.then(function (c) {
    console.log('opening publisher conn');
    conn = c;
}).catch(console.warn);

// Publisher
module.exports.publishMessage = function (msg) {
    conn.createChannel().then(function (ch) {
        return ch.assertQueue(queue).then(function (ok) {
            console.log('publishing a message!')
            return ch.sendToQueue(q, Buffer.from(msg));
        });
    }).catch(console.warn);
};
