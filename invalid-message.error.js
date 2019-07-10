class InvalidMessage extends Error {

    constructor(messages) {
        super(messages);
        this.name = 'InvalidMessage';
        this.messages = messages;
    }

}

module.exports = InvalidMessage;
