const { task, status, data, execution, InvalidMessage } = require('.');

/* Create Task Message */
try {
    const m1 = task.createMessage(task.MESSAGE_TYPES.TASK_CREATE, {});
    console.log(m1.id);
    task.createMessage(task.MESSAGE_TYPES.TEST);
} catch (err) {
    if (err instanceof InvalidMessage) {
        console.log('Invalid Message');
    }
}
