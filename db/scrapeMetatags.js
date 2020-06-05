const redis = require('redis'),
    client = redis.createClient(),
    funcs = {};

funcs.saveData = async (key, data, url) => {
    client.on('connect', function () {
        console.log('connected');
    });
    await client.set(key, JSON.stringify(data));
}


funcs.getData = async () => {
    return new Promise((resolve, reject) => {
        client.get('post.scrap', (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        })
    })
}
funcs.deleteData = async () => {
    return new Promise((resolve, reject) => {
        client.flushdb((err, data) => {
            if (err) return reject(err);
            return resolve(data);
        })
    })
}

module.exports = funcs;
