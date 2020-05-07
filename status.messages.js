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
 * Represents a generic message.
 * It acts as a class template for other classes, and most likely should not be instantiated directly.
 *
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
 * Represents a IndexCreatedMessage.
 * Issued after a new Elasticsearch index has been created.
 *
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
 * Represents a IndexDeactivatedMessage.
 * Issued after an Elasticsearch index has been deactivated.
 *
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
 * Represents a ReadDataMessage.
 * Issued when a data block has been read from a file.
 *
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class ReadDataMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_READ_DATA, taskId);
        this.hash = props.hash;
        this.file = props.file;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.hash) {
            throw new InvalidMessage('Hash required');
        }
        if (!this.file) {
            throw new InvalidMessage('File required');
        }
    }

}

/**
 * Represents a BlockChainGeneratedMessage.
 * Issued when a blockchain signature has been generated.
 *
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
 * Represents a ReadFileMessage.
 * Issued when a file has been fully read.
 * Increments the task's `filesProcessed` counter.
 *
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class ReadFileMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_READ_FILE, taskId);
        this.file = props.file;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.file) {
            throw new InvalidMessage('File required');
        }
    }

}

/**
 * Represents a WriteMessage.
 * Issued when a data block has been written into an Elasticsearch index.
 *
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class WrittenDataMessage extends Message {

    constructor(taskId, props) {
        super(MESSAGE_TYPES.STATUS_WRITTEN_DATA, taskId);
        this.withErrors = props.withErrors;
        this.detail = props.detail;
        this.index = props.index;
        this.hash = props.hash;
        this.file = props.file;
        this.validate();
    }

    validate() {
        super.validate();
        if (!this.index) {
            throw new InvalidMessage('Index required');
        }
        if (!this.hash) {
            throw new InvalidMessage('Hash required');
        }
        if (!this.file) {
            throw new InvalidMessage('File required');
        }
    }

}

/**
 * Represents a PerformedDeleteQueryMessage.
 * Issued when a delete query has been issued to an Elasticsearch index.
 *
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
 * Represents a FinishedDeleteQueryMessage.
 * Issued when a delete query to an Elasticsearch index has finished executing.
 *
 * @constructor
 * @param {string} type - The type of the message.
 * @param {string} taskId - The taskId of the message.
 */
class FinishedDeleteQueryMessage extends Message {

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
 * Issued when an Elasticsearch index reindex operation is triggered.
 *
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
 * Represents a FinishedReindexMessage.
 * Issued when an Elasticsearch reindex operation has been successfully finished.
 *
 * @constructor
 * @param {string} taskId - The taskId of the message.
 * @param {string} props - The props of the message.
 */
class FinishedReindexMessage extends Message {

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
 * Represents a IndexDeletedMessage.
 * Issued when an Elasticsearch index has been deleted.
 *
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
 * Represents a ImportConfirmedMessage.
 * Issued after the Elasticsearch index reactivation has been requested.
 *
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
            return new ReadDataMessage(props.taskId, props);
        case MESSAGE_TYPES.STATUS_BLOCKCHAIN_GENERATED:
            return new BlockChainGeneratedMessage(props.taskId, props);
        case MESSAGE_TYPES.STATUS_READ_FILE:
            return new ReadFileMessage(props.taskId, props);
        case MESSAGE_TYPES.STATUS_WRITTEN_DATA:
            return new WrittenDataMessage(props.taskId, props);
        case MESSAGE_TYPES.STATUS_PERFORMED_DELETE_QUERY:
            return new PerformedDeleteQueryMessage(props.taskId, props);
        case MESSAGE_TYPES.STATUS_FINISHED_DELETE_QUERY:
            return new FinishedDeleteQueryMessage(props.taskId);
        case MESSAGE_TYPES.STATUS_PERFORMED_REINDEX:
            return new PerformedReindexMessage(props.taskId, props);
        case MESSAGE_TYPES.STATUS_FINISHED_REINDEX:
            return new FinishedReindexMessage(props.taskId);
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
