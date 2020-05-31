const chai = require("chai"),
    config = require('config'),
    should = chai.should(),
    chaiHttp = require("chai-http"),
    assert = chai.assert,
    indexRoutes = require("../../../routes/index"),
    server = require('../../../app');

chai.use(chaiHttp);


//Our parent block
describe(`Podcast`, () => {
    describe(`/GET media`, () => {
        it('add function should add two numbers', function (done) {
            chai.request(server)
                .get("/add")
                .end((err, res) => {
                    (res).should.have.status(config.get('httpStatusCode.oK'));
                    (res.body.result).should.be.eql(21);
                    done();
                });
        });
    });
});