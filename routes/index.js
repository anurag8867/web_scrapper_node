var express = require('express'),
    path = require('path'),
    config = require('config'),
    dbRepository = require('../db/scrapeMetatags'),
    scrapeMetatags = require("../services/scrapeMetatags");

let app = express();

app.get('/', async function (req, res) {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.delete('/scrap', async function (req, res) {
    try {
        let resp = await dbRepository.deleteData();
        return res.status((config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')) || parseInt(config.get('httpStatusCode.oK'))))
            .send(resp);
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.get('/db', async function (req, res) {
    try {
        let resp = await dbRepository.getData();
        return res.status((config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')) || parseInt(config.get('httpStatusCode.oK'))))
            .send(resp);
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.get('/scrap', async function (req, res) {
    try {
        if (!req.query.url) {
            return res.status(400).send({
                msg: "a valid url is expected in url as the key in body"
            });
        }
        let resp = await scrapeMetatags.scrap(req.query.url);
        return res.status((config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')) || parseInt(config.get('httpStatusCode.oK'))))
            .send({ result: resp });
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.post('/scrap', async function (req, res) {
    try {
        if (!req.body || !req.body.data) {
            return res.status(400).send({
                msg: "a valid data is expected to save into DB"
            });
        }
        await dbRepository.saveData('post.scrap', req.body.data);
        return res.status((config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')) || parseInt(config.get('httpStatusCode.oK'))))
            .send("Data Saved");
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = app;