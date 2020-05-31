const chai = require("chai"),
    assert = chai.assert,
    mathService = require("../../../services/math");


//Our parent block
describe(`Podcast`, () => {
    describe(`/GET media`, () => {
        it('should return -1 when the value is not present', async function () {
            let res = await mathService.add(10, 20);
            console.log({ res });
            assert.equal(res, 30);
        });
    });
});