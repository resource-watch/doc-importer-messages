const { task, status, data, execution, InvalidMessage } = require('.');

/* Create Task Message */
try {
    const msgOne = task.createMessage(task.MESSAGE_TYPES.PEPE);
    console.log(msgOne);
} catch (err) {
    if (err instanceof InvalidMessage) {
        console.log('Invalid Message');
    }
}
