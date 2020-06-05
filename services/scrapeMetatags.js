const cheerio = require("cheerio"),
    getUrls = require("get-urls"),
    request = require("request-promise"),
    async = require('async');

const scrap = async (text) => {
    if (!getUrls(text).size) {
        throw {
            msg: "not a valid url"
        }
    }
    const res = await request({
        uri: text,
        gzip: true
    });
    if (res) throw {
        msg: "No response recovered form the given url"
    }
    const $ = cheerio.load(res);
    let linkDetails = [];
    let parallelArray = [];
    return new Promise((resolve, reject) => {
        $('a').each((i, link) => {
            const url = $(link).attr('href'),
                caption = $(link).text().trim();
            let pickUrl = url && getUrls(url).size && url && getUrls(url).values() &&
                getUrls(url).values().next() && getUrls(url).values().next().value || null;
            if (pickUrl) {
                parallelArray.push(
                    (callback) => {
                        request({
                            uri: pickUrl,
                            method: "HEAD"
                        }, (err, response, body) => {
                            if (err) return callback(err, null);
                            if (response) {
                                linkDetails.push({
                                    pickUrl,
                                    caption,
                                    contentSize: response.headers["content-length"] || null,
                                    lastModifiedDate: response.headers["last-modified"] || null,
                                    contentEncoding: response.headers["content-type"] || null,
                                    server: response.request.host
                                })
                            }
                            return callback(null, response);
                        });
                    }
                )
            }
        });
        async.parallel(parallelArray, (err, data) => {
            if (err) return reject(err);
            return resolve(linkDetails);
        });
    })
};

module.exports = {
    scrap
}