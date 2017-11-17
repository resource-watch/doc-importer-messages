const uuid = require('uuid4');

const MESSAGE_TYPES = {
    CREATE: 'CREATE',
    CONCAT: 'CONCAT',
    OVERWRITE: 'OVERWRITE',
    DELETE: 'DELETE'
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
 * @param {string} type - The type of the message.
 * @param {string} props - The propr of the message.
 */
class CreateMessage extends Message {

    constructor(type, props) {
        super(type);
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
 * @param {string} type - The type of the message.
 * @param {string} props - The propr of the message.
 */
class ConcatMessage extends Message {

    constructor(type, props) {
        super(type);
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
 * @param {string} type - The type of the message.
 * @param {string} props - The propr of the message.
 */
class OverwriteMessage extends Message {

    constructor(type, props) {
        super(type);
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
 * @param {string} type - The type of the message.
 * @param {string} props - The propr of the message.
 */
class DeleteMessage extends Message {

    constructor(type, props) {
        super(type);
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

    case MESSAGE_TYPES.CREATE:
        return new CreateMessage(type, props);
    case MESSAGE_TYPES.CONCAT:
        return new ConcatMessage(type, props);
    case MESSAGE_TYPES.OVERWRITE:
        return new OverwriteMessage(type, props);
    case MESSAGE_TYPES.DELETE:
        return new DeleteMessage(type, props);
    default:
        return new Message(type);

    }

}

module.exports = createMessage;
