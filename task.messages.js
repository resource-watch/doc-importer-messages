const uuid = require('uuid4');
const InvalidMessage = require('./invalid-message.error');

const MESSAGE_TYPES = {
    TASK_CREATE: 'TASK_CREATE',
    TASK_CONCAT: 'TASK_CONCAT',
    TASK_OVERWRITE: 'TASK_OVERWRITE',
    TASK_DELETE: 'TASK_DELETE',
    TASK_DELETE_INDEX: 'TASK_DELETE_INDEX'
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
    }

    validate() {
        if (!this.type) {
            throw new InvalidMessage('Invalid message type');
        }
    }

}

/**
 * Represents a CreateMessage.
 * @constructor
 * @param {string} props - The props of the message.
 */
class CreateMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_CREATE);
        this.datasetId = props.datasetId;
        this.fileUrl = props.fileUrl;
        this.data = props.data;
        this.provider = props.provider;
        this.legend = props.legend;
        this.verified = props.verified;
        this.dataPath = props.dataPath;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.datasetId) {
            throw new InvalidMessage('DatasetId is required');
        }
        if (!this.provider) {
            throw new InvalidMessage('Provider is required');
        }
        if (!this.fileUrl && !this.data) {
            throw new InvalidMessage('Data or fileUrl is required');
        }
    }

}

/**
 * Represents a ConcatMessage.
 * @constructor
 * @param {string} props - The props of the message.
 */
class ConcatMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_CONCAT);
        this.datasetId = props.datasetId;
        this.fileUrl = props.fileUrl;
        this.data = props.data;
        this.provider = props.provider;
        this.legend = props.legend;
        this.verified = props.verified;
        this.dataPath = props.dataPath;
        this.index = props.index;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.datasetId) {
            throw new InvalidMessage('DatasetId is required');
        }
        if (!this.index) {
            throw new InvalidMessage('Index is required');
        }
        if (!this.provider) {
            throw new InvalidMessage('Provider is required');
        }
        if (!this.fileUrl && !this.data) {
            throw new InvalidMessage('Data or fileUrl is required');
        }
    }

}

/**
 * Represents an OverwriteMessage.
 * @constructor
 * @param {string} props - The props of the message.
 */
class OverwriteMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_OVERWRITE);
        this.datasetId = props.datasetId;
        this.fileUrl = props.fileUrl;
        this.data = props.data;
        this.provider = props.provider;
        this.legend = props.legend;
        this.verified = props.verified;
        this.dataPath = props.dataPath;
        this.index = props.index;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.datasetId) {
            throw new InvalidMessage('DatasetId is required');
        }
        if (!this.index) {
            throw new InvalidMessage('Index is required');
        }
        if (!this.provider) {
            throw new InvalidMessage('Provider is required');
        }
        if (!this.fileUrl && !this.data) {
            throw new InvalidMessage('Data or fileUrl is required');
        }
    }

}

/**
 * Represents a DeleteMessage.
 * @constructor
 * @param {string} props - The props of the message.
 */
class DeleteMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_DELETE);
        this.query = props.query;
        this.index = props.index;
        this.datasetId = props.datasetId;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.query) {
            throw new InvalidMessage('Delete message needs a valid query');
        }
        if (!this.index) {
            throw new InvalidMessage('Index is required');
        }
        return true;
    }

}

/**
 * Represents a DeleteIndexMessage.
 * @constructor
 * @param {string} props - The props of the message.
 */
class DeleteIndexMessage extends Message {

    constructor(props) {
        super(MESSAGE_TYPES.TASK_DELETE_INDEX);
        this.index = props.index;
        this.datasetId = props.datasetId;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.index) {
            throw new InvalidMessage('Index required');
        }
        if (!this.datasetId) {
            throw new InvalidMessage('Dataset ID required');
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
    case MESSAGE_TYPES.TASK_DELETE_INDEX:
        return new DeleteIndexMessage(props);
    default:
        throw new InvalidMessage('Invalid Type');

    }

}

module.exports = {
    createMessage,
    MESSAGE_TYPES
};
