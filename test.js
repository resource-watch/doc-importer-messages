const { task } = require('.');

/* TASK MESSAGES */
try {
    /* Create */
    const m1 = task.createMessage(task.MESSAGE_TYPES.TASK_CREATE, {
        datasetId: '1234',
        fileUrl: 'https://www.example.com/doc.pdf',
        provider: 'csv'
    });
    console.log(m1);
    /* Concat */
    const m2 = task.createMessage(task.MESSAGE_TYPES.TASK_CONCAT, {
        datasetId: '1234',
        fileUrl: 'https://www.example.com/doc.pdf',
        provider: 'csv',
        index: 'index_1234'
    });
    console.log(m2);
    /* Overwrite */
    const m3 = task.createMessage(task.MESSAGE_TYPES.TASK_OVERWRITE, {
        datasetId: '1234',
        fileUrl: 'https://www.example.com/doc.pdf',
        provider: 'csv',
        index: 'index_1234'
    });
    /* Delete */
    console.log(m3);
    const m4 = task.createMessage(task.MESSAGE_TYPES.TASK_DELETE, {
        query: 'DELETE * FROM index_1234 where year = 2017'
    });
    console.log(m4);
    /* Delete Index */
    const m5 = task.createMessage(task.MESSAGE_TYPES.TASK_DELETE_INDEX, {
        index: 'index_1234'
    });
    console.log(m5);
} catch (err) {
    console.log(err);
}
