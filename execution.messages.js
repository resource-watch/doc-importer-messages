const uuid = require('uuid4');
const InvalidMessage = require('./invalid-message.error');

const MESSAGE_TYPES = {
    EXECUTION_CREATE: 'EXECUTION_CREATE',
    EXECUTION_CONCAT: 'EXECUTION_CONCAT',
    EXECUTION_APPEND: 'EXECUTION_APPEND',
    EXECUTION_DELETE: 'EXECUTION_DELETE',
    EXECUTION_CONFIRM_DELETE: 'EXECUTION_CONFIRM_DELETE',
    EXECUTION_DELETE_INDEX: 'EXECUTION_DELETE_INDEX',
    EXECUTION_CONFIRM_IMPORT: 'EXECUTION_CONFIRM_IMPORT',
    EXECUTION_REINDEX: 'EXECUTION_REINDEX',
    EXECUTION_CONFIRM_REINDEX: 'EXECUTION_CONFIRM_REINDEX',
    EXECUTION_READ_FILE: 'EXECUTION_READ_FILE'
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
 * Represents a CreateMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class CreateMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_CREATE, taskId);
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
            throw new Error('datasetId required');
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
 * Represents a ReIndexMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class ReIndexMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_REINDEX, taskId);
        this.sourceIndex = props.sourceIndex;
        this.targetIndex = props.targetIndex;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.sourceIndex) {
            throw new Error('sourceIndex required');
        }
        if (!this.targetIndex) {
            throw new Error('targetIndex required');
        }
    }

}

/**
 * Represents a ConfirmReIndexMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class ConfirmReIndexMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_CONFIRM_REINDEX, taskId);
        this.elasticTaskId = props.elasticTaskId;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.elasticTaskId) {
            throw new InvalidMessage('ElasticTaskId required');
        }
    }

}


/**
 * Represents a ConcatMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class ConcatMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_CONCAT, taskId);
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
 * Represents a AppendMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class AppendMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_APPEND, taskId);
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
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class DeleteMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_DELETE, taskId);
        this.query = props.query;
        this.index = props.index;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.query) {
            throw new InvalidMessage('Query required');
        }
        if (!this.index) {
            throw new InvalidMessage('Index required');
        }
    }

}

/**
 * Represents a ConfirmDeleteMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class ConfirmDeleteMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_CONFIRM_DELETE, taskId);
        this.elasticTaskId = props.elasticTaskId;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.elasticTaskId) {
            throw new InvalidMessage('ElasticTaskId required');
        }
    }

}

/**
 * Represents a ConfirmDeleteMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class DeleteIndexMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_DELETE_INDEX, taskId);
        this.index = props.index;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.index) {
            throw new InvalidMessage('Index required');
        }
    }

}

/**
 * Represents a ConfirmDeleteMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class ConfirmImportMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_CONFIRM_IMPORT, taskId);
        this.index = props.index;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.index) {
            throw new InvalidMessage('Index required');
        }
    }

}

/**
 * Represents a ReadFileMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {object} props - The props of the message.
 */
class ReadFileMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.EXECUTION_READ_FILE, taskId);
        this.fileUrl = props.fileUrl;
        this.provider = props.provider;
        this.dataPath = props.dataPath;
        this.index = props.index;
        this.datasetId = props.datasetId;
        this.data = props.data;
        this.legend = props.legend;
        this.verified = props.verified;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.fileUrl && !this.data) {
            throw new InvalidMessage('Data or file URL is required');
        }
        if (!this.provider) {
            throw new InvalidMessage('Provider is required');
        }
        if (!this.index) {
            throw new InvalidMessage('Empty index prop');
        }
    }

}


function createMessage(type, props) {

    switch (type) {

        case MESSAGE_TYPES.EXECUTION_CREATE:
            return new CreateMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_CONCAT:
            return new ConcatMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_APPEND:
            return new AppendMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_DELETE:
            return new DeleteMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_CONFIRM_DELETE:
            return new ConfirmDeleteMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_DELETE_INDEX:
            return new DeleteIndexMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_CONFIRM_IMPORT:
            return new ConfirmImportMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_CONFIRM_REINDEX:
            return new ConfirmReIndexMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_REINDEX:
            return new ReIndexMessage(props.taskId, props);
        case MESSAGE_TYPES.EXECUTION_READ_FILE:
            return new ReadFileMessage(props.taskId, props);
        default:
            throw new InvalidMessage('Invalid Type');

    }

}

module.exports = {
    createMessage,
    MESSAGE_TYPES
};
