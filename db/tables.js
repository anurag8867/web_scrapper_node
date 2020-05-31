const async = require("async"),
    config = require("config"),
    dbConnection = require('./connect');
// if (!con) throw {
//     msg: "db connection not created",
//     status: config.get("httpStatusCode.serviceUnavailable")
// }

async function createConnection() {
    let connection = await dbConnection.createConnection();
    con = process.connection;
    console.log(connection);
}

(async function () {
    await createConnection();
    let result = await async.every(Object.values(config.get('tables')), function (query, callback) {
        con.query(query, function (err, result) {
            if (err) return callback(err, null);
            console.log(`Table created ${query}`);
            return callback(null, result);
        });
    });
    console.log(`All Tables Created ${result}`);
    return `All Tables Created ${result}`;
})();