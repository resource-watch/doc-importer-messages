const uuid = require('uuid4');
const InvalidMessage = require('./invalid-message.error');

const MESSAGE_TYPES = {
    STATUS_INDEX_CREATED: 'STATUS_INDEX_CREATED',
    STATUS_INDEX_DEACTIVATED: 'STATUS_INDEX_DEACTIVATED',
    STATUS_READ_DATA: 'STATUS_READ_DATA',
    STATUS_BLOCKCHAIN_GENERATED: 'STATUS_BLOCKCHAIN_GENERATED',
    STATUS_READ_FILE: 'STATUS_READ_FILE',
    STATUS_WRITTEN_DATA: 'STATUS_WRITTEN_DATA',
    STATUS_PERFORMED_DELETE_QUERY: 'STATUS_PERFORMED_DELETE_QUERY',
    STATUS_FINISHED_DELETE_QUERY: 'STATUS_FINISHED_DELETE_QUERY',
    STATUS_PERFORMED_REINDEX: 'STATUS_PERFORMED_REINDEX',
    STATUS_FINISHED_REINDEX: 'STATUS_FINISHED_REINDEX',
    STATUS_INDEX_DELETED: 'STATUS_INDEX_DELETED',
    STATUS_IMPORT_CONFIRMED: 'STATUS_IMPORT_CONFIRMED',
    STATUS_ERROR: 'STATUS_ERROR'
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

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_INDEX_CREATED, taskId);
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
 * Represents a ReadMessage.
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class IndexDeactivatedMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_INDEX_DEACTIVATED, taskId);
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
class BlockChainGeneratedMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_BLOCKCHAIN_GENERATED, taskId);
        this.blockchain = props.blockchain;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.blockchain) {
            throw new InvalidMessage('Blockchain required');
        }
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

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_WRITTEN_DATA, taskId);
        this.withErrors = props.withErrors;
        this.detail = props.detail;
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

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_PERFORMED_DELETE_QUERY, taskId);
        this.lastCheckedDate = new Date();
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
 * Represents a PerformedReindexMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {string} props - The props of the message.
 */
class PerformedReindexMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_PERFORMED_REINDEX, taskId);
        this.lastCheckedDate = new Date();
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
 * Represents a FinishedReindex.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {string} props - The props of the message.
 */
class FinishedReindex extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_FINISHED_REINDEX, taskId);
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
class ImportConfirmedMessage extends Message {

    constructor(taskId) {
        super(MESSAGE_TYPES.STATUS_IMPORT_CONFIRMED, taskId);
        this.lastCheckedDate = new Date();
        this.validate();
    }

    validate() {
        super.validate();
    }

}

/**
 * Represents a ErrorMessage.
 * @constructor
 * @param {string} taskId - The taskId of the message.
 */
class ErrorMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_ERROR, taskId);
        this.error = props.error;
        this.validate();
    }

    validate() {
        super.validate();
    }

}

function createMessage(type, props) {

    switch (type) {

    case MESSAGE_TYPES.STATUS_INDEX_CREATED:
        return new IndexCreatedMessage(props.taskId, props);
    case MESSAGE_TYPES.STATUS_INDEX_DEACTIVATED:
        return new IndexDeactivatedMessage(props.taskId, props);
    case MESSAGE_TYPES.STATUS_READ_DATA:
        return new ReadDataMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_BLOCKCHAIN_GENERATED:
        return new BlockChainGeneratedMessage(props.taskId, props);
    case MESSAGE_TYPES.STATUS_READ_FILE:
        return new ReadFileMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_WRITTEN_DATA:
        return new WrittenDataMessage(props.taskId, props);
    case MESSAGE_TYPES.STATUS_PERFORMED_DELETE_QUERY:
        return new PerformedDeleteQueryMessage(props.taskId, props);
    case MESSAGE_TYPES.STATUS_FINISHED_DELETE_QUERY:
        return new FinishedDeleteQuery(props.taskId);
    case MESSAGE_TYPES.STATUS_PERFORMED_REINDEX:
        return new PerformedReindexMessage(props.taskId, props);
    case MESSAGE_TYPES.STATUS_FINISHED_REINDEX:
        return new FinishedReindex(props.taskId);
    case MESSAGE_TYPES.STATUS_INDEX_DELETED:
        return new IndexDeletedMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_IMPORT_CONFIRMED:
        return new ImportConfirmedMessage(props.taskId);
    case MESSAGE_TYPES.STATUS_ERROR:
        return new ErrorMessage(props.taskId, props);
    default:
        throw new InvalidMessage('Invalid Type');

    }

}

module.exports = {
    createMessage,
    MESSAGE_TYPES
};
