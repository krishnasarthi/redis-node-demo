const redisManager = require('./redisManager');
const redisInst = new redisManager();

async function getUsers() {
    let keyPattern = `room:1:user:*`;
    let users = [];
    let keys = await redisInst.scanKeys(keyPattern);

    let users = await redisInst.getUsers(keys);

    return users;
}

getUsers().then(data => {
    console.log(data);
});

