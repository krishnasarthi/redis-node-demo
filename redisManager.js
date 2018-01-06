'use strict';

// import node.js redis client (https://github.com/NodeRedis/node_redis)
const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);


class RedisManager {
    constructor() {
        this.client = redis.createClient();
    }

    async getKeys(keyPattern) {
        let keys = await this.client.keysAsync(keyPattern);
        return keys;
    }

    async scanKeys(keyPattern) {
        let cursor = 0;
        let keys = [];

        let result = await this.client.scanAsync(cursor, 'MATCH', keyPattern);
        cursor = parseInt(result[0]);
        keys.push(...result[1]);

        while (cursor > 0) {
            result = await this.client.scanAsync(cursor, 'MATCH', keyPattern);
            cursor = parseInt(result[0]);
            keys.push(...result[1]);
        }
        return keys;
    }

    async getUser(key) {
        let user = await this.client.getAsync(key);
        return user;
    }

    async setUser(key, user) {
        let response = await this.client.setAsync(key, user);
    }

    async getUsers(keys) {
        let users = await this.client.mgetAsync(keys);
        return users;
    }
}

module.exports = RedisManager;