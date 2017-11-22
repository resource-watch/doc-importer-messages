const uuid = require('uuid4');
const InvalidMessage = require('./invalid-message.error');

const MESSAGE_TYPES = {
    STATUS_INDEX_CREATED: 'STATUS_INDEX_CREATED',
    STATUS_READ_DATA: 'STATUS_READ_DATA',
    STATUS_READ_FILE: 'STATUS_READ_FILE',
    STATUS_WRITTEN_DATA: 'STATUS_WRITTEN_DATA',
    STATUS_PERFORMED_DELETE_QUERY: 'STATUS_PERFORMED_DELETE_QUERY',
    STATUS_FINISHED_DELETE_QUERY: 'STATUS_FINISHED_DELETE_QUERY',
    STATUS_INDEX_DELETED: 'STATUS_INDEX_DELETED',
    STATUS_INDEX_CONFIRMED: 'STATUS_INDEX_CONFIRMED'
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
 * Represents a ReadMessage.
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class IndexCreatedMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_INDEX_CREATED, taskId);
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
class ReadDataMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_READ_DATA, taskId);
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
class ReadFileMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_READ_FILE, taskId);
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
class WrittenDataMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_WRITTEN_DATA, taskId);
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
class PerformedDeleteQueryMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_PERFORMED_DELETE_QUERY, taskId);
        this.lastCheckedDate = new Date();
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
class FinishedDeleteQuery extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_FINISHED_DELETE_QUERY, taskId);
        this.lastCheckedDate = new Date();
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
class IndexDeletedMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_INDEX_DELETED, taskId);
        this.lastCheckedDate = new Date();
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
class IndexConfirmedMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_INDEX_CONFIRMED, taskId);
        this.lastCheckedDate = new Date();
        this.validate();
    }

    validate() {
        super.validate();
    }

}

function createMessage(type, props) {

    switch (type) {

    case MESSAGE_TYPES.STATUS_INDEX_CREATED:
        return new IndexCreatedMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_READ_DATA:
        return new ReadDataMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_READ_FILE:
        return new ReadFileMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_WRITTEN_DATA:
        return new WrittenDataMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_PERFORMED_DELETE_QUERY:
        return new PerformedDeleteQueryMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_FINISHED_DELETE_QUERY:
        return new FinishedDeleteQuery(props.taskId);
    case MESSAGE_TYPES.STATUS_INDEX_DELETED:
        return new IndexDeletedMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_INDEX_CONFIRMED:
        return new IndexConfirmedMessage(props.taskId);
    default:
        throw new InvalidMessage('Invalid Type');

    }

}

module.exports = {
    createMessage,
    MESSAGE_TYPES
};
