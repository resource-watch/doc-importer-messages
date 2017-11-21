const uuid = require('uuid4');

const MESSAGE_TYPES = {
    STATUS_READ: 'STATUS_READ',
    STATUS_WRITE: 'STATUS_WRITE',
    STATUS_CHECK_DELETE: 'STATUS_CHECK_DELETE'
};

/**
 * Represents a Message.
 * @constructor
 * @param {string} type - The type of the message.
 */
class Message {

    constructor(type, taskId) {
        this.id = uuid();
        this.type = MESSAGE_TYPES[type] ? type : null;
        this.taskId = taskId;
    }

    validate() {
        if (!this.type) {
            throw new Error('Invalid message type');
        }
        if (!this.taskId) {
            throw new Error('Invalid taskId');
        }
    }

}

/**
 * Represents a ReadMessage.
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class ReadMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.READ, taskId);
        this.validate();
    }

    validate() {
        super.validate();
    }

}

/**
 * Represents a WriteMessage.
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class WriteMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.WRITE, taskId);
        this.validate();
    }

    validate() {
        super.validate();
    }

}

/**
 * Represents a CheckDeleteMessage.
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class CheckDeleteMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.WRITE, taskId);
        this.lastCheckedDate = new Date();
        this.validate();
    }

    validate() {
        super.validate();
    }

}

function createMessage(type, props) {

    switch (type) {

        case MESSAGE_TYPES.STATUS_READ:
            return new ReadMessage(props.taskId);
        case MESSAGE_TYPES.STATUS_WRITE:
            return new WriteMessage(props.taskId);
        case MESSAGE_TYPES.STATUS_CHECK_DELETE:
            return new CheckDeleteMessage(props.taskId);
        default:
            return new Message(type);

    }

}

module.exports = {
    createMessage,
    MESSAGE_TYPES
};
