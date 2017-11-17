const message = require('.');

/* Creating messages */
const createMessage = message('CREATE', {});
const concatMessage = message('CONCAT', {});
const overwriteMessage = message('CREATE', {});
const deleteMessage = message('DELETE', {
    query: 'query'
});

/* Catching errors */
try {
    const nonMessage = message('NON', {});
    const badDeleteMessage = message('DELETE', {});
} catch (err) {
    console.log('OK');
}
