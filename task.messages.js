const uuid = require('uuid4');

const MESSAGE_TYPES = {
    TASK_CREATE: 'TASK_CREATE',
    TASK_CONCAT: 'TASK_CONCAT',
    TASK_OVERWRITE: 'TASK_OVERWRITE',
    TASK_DELETE: 'TASK_DELETE'
};

/**
 * Represents a Message.
 * @constructor
 * @param {string} type - The type of the message.
 */
class Message {

    constructor(type) {
        this.id = uuid();
        this.type = MESSAGE_TYPES[type] ? type : null;
        if (!this.type) {
            this.error('Invalid message type');
        }
    }

    error(msg) {
        throw new Error(msg);
    }

}

/**
 * Represents a CreateMessage.
 * @constructor
 * @param {string} props - The propr of the message.
 */
class CreateMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_CREATE);
        this.fileUrl = props.fileUrl;
        this.data = props.data;
        this.legend = props.legend;
        this.provider = props.provider;
        this.datasetId = props.datasetId;
        const validate = this.validate();
        if (validate !== true) {
            this.error(validate);
        }
    }

    validate() {
        return true;
    }

}

/**
 * Represents a ConcatMessage.
 * @constructor
 * @param {string} props - The propr of the message.
 */
class ConcatMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_CONCAT);
        this.fileUrl = props.fileUrl;
        this.data = props.data;
        this.legend = props.legend;
        this.provider = props.provider;
        this.datasetId = props.datasetId;
        this.index = props.index;
        const validate = this.validate();
        if (validate !== true) {
            this.error(validate);
        }
    }

    validate() {
        return true;
    }

}

/**
 * Represents an OverwriteMessage.
 * @constructor
 * @param {string} props - The propr of the message.
 */
class OverwriteMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_OVERWRITE);
        this.fileUrl = props.fileUrl;
        this.data = props.data;
        this.legend = props.legend;
        this.provider = props.provider;
        this.datasetId = props.datasetId;
        this.index = props.index;
        const validate = this.validate();
        if (validate !== true) {
            this.error(validate);
        }
    }

    validate() {
        return true;
    }

}

/**
 * Represents a DeleteMessage.
 * @constructor
 * @param {string} props - The propr of the message.
 */
class DeleteMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_DELETE);
        this.query = props.query ? props.query : null;
        const validate = this.validate();
        if (validate !== true) {
            this.error(validate);
        }
    }

    validate() {
        if (!this.query) {
            return 'Delete message needs a valid query';
        }
        return true;
    }

}

function createMessage(type, props) {

    switch (type) {

        case MESSAGE_TYPES.TASK_CREATE:
            return new CreateMessage(props);
        case MESSAGE_TYPES.TASK_CONCAT:
            return new ConcatMessage(props);
        case MESSAGE_TYPES.TASK_OVERWRITE:
            return new OverwriteMessage(props);
        case MESSAGE_TYPES.TASK_DELETE:
            return new DeleteMessage(props);
        default:
            return new Message(type);

    }

}

module.exports = {
    createMessage,
    MESSAGE_TYPES
};
