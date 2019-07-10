const uuid = require('uuid4');
const InvalidMessage = require('./invalid-message.error');

const MESSAGE_TYPES = {
    DATA: 'DATA'
};

/**
 * Represents a Message.
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class Message {

    constructor(type, taskId) {
        this.id = uuid();
        this.type = MESSAGE_TYPES[type] ? type : null;
        this.taskId = taskId;
    }

    validate() {
        if (!this.type) {
            throw new InvalidMessage('Invalid message type');
        }
        if (!this.taskId) {
            throw new InvalidMessage('Invalid taskId');
        }
    }

}

/**
 * Represents a DataMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 * @param {Array} props.data - Data to save
 */
class DataMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.DATA, taskId);
        this.data = props.data;
        this.index = props.index;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.data) {
            throw new InvalidMessage('Empty data prop');
        }
        if (!this.index) {
            throw new InvalidMessage('Empty index prop');
        }
    }

}


function createMessage(type, props) {

    switch (type) {

        case MESSAGE_TYPES.DATA:
            return new DataMessage(props.taskId, props);
        default:
            throw new InvalidMessage('Invalid Type');

    }

}

module.exports = {
    createMessage,
    MESSAGE_TYPES
};
