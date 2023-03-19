const { ImapFlow } = require('imapflow');
const client = new ImapFlow({
    host: 'oxffffsb@gmail.com',
    port: 993,
    secure: true,
    auth: {
        user: 'oxffffsb@gmail.com',
        pass: 'wnhfnehjtbsrgdno'
    }
});

const getMail = async () => {
    // Wait until client connects and authorizes
    var body = "";
    await client.connect();

    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock('INBOX');
    try {
        // fetch latest message source
        // client.mailbox includes information about currently selected mailbox
        // "exists" value is also the largest sequence number available in the mailbox
        let message = await client.fetchOne(client.mailbox.exists, { source: true });
        console.log(message.source.toString());

        // list subjects for all messages
        // uid value is always included in FETCH response, envelope strings are in unicode.
        for await (let message of client.fetch('1:*', { envelope: true })) {
            console.log(`${message.uid}: ${message.envelope.subject}`);
            body = body + `<tr><td>${message.uid}</td><td>${message.envelope.subject}</td></tr>\n`
        }
    } finally {
        // Make sure lock is released, otherwise next `getMailboxLock()` never returns
        lock.release();
        
    }

    // log out and close connection
    await client.logout();
    return body; 
};

main().catch(err => console.error(err));

module.exports.getMail = getMail;

