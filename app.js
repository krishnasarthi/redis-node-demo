const redisManager = require('./redisManager');
const redisInst = new redisManager();

async function getUsers() {
    let keyPattern = `room:1:user:*`;
    let users = [];
    let keys1 = await redisInst.getKeys(keyPattern);
    let keys = await redisInst.scanKeys(keyPattern);

    let usersBatch = await redisInst.getUsers(keys);

    // for (let i = 0; i < keys.length; i++) {
    //     let key = keys[i];
    //     let user = await redisInst.getUser(key);
    //     users.push(user);
    // }

    // return users;
    return usersBatch;
}

getUsers().then(data => {
    console.log(data);
});

