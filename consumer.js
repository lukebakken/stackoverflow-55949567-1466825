const amqp = require('amqplib')
const open = amqp.connect('amqp://localhost');
const queue = 'hello';

var conn = null;
open.then(function (c) {
    console.log('opening consumer conn');
    conn = c;
}).catch(console.warn);

// Consumer
module.exports.startConsumer = function () {
    conn.createChannel().then(function (ch) {
        return ch.assertQueue(queue).then(function (ok) {
            return ch.consume(queue, function (msg) {
                if (msg !== null) {
                    console.log('msg in consumer: ', msg.content.toString());
                    ch.ack(msg);
                } else {
                    console.log('null msg received')
                }
            });
        });
    }).catch(console.warn);
};
