const task = require('./task.messages');
const status = require('./status.messages');
const data = require('./data.messages');
const execution = require('./execution.messages');
const InvalidMessage = require('./invalid-message.error');

module.exports = {
    task: {
        createMessage: task.createMessage,
        MESSAGE_TYPES: task.MESSAGE_TYPES
    },
    status: {
        createMessage: status.createMessage,
        MESSAGE_TYPES: status.MESSAGE_TYPES
    },
    data: {
        createMessage: data.createMessage,
        MESSAGE_TYPES: data.MESSAGE_TYPES
    },
    execution: {
        createMessage: execution.createMessage,
        MESSAGE_TYPES: execution.MESSAGE_TYPES
    },
    InvalidMessage
};
