const publisher = require('./publisher');
const consumer = require('./consumer');

consumer.startConsumer();

publisher.publishMessage('hello world!');
