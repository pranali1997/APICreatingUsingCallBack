const assert = require('chai').assert;
var controller = require('../app/controller/note.controller.js')
var service = require('../app/services/note.service')
var sinon = require('sinon');

    let req = {
        body: {
            title: 'abd',
            content: 'content'
        }
    },
        error = new Error({ error: "blah blah" })
        
    describe('controller api', function () {
        beforeEach(function () {
            res = {
               json: sinon.spy(),
               status: sinon.stub().returns({ send: sinon.spy() }) // to spy res.status(500).end()
           }
       });

        it('should create a parameter', function () {

            expectedResult = req.body;
            sinon.stub(service, 'create').yields(null, expectedResult);
            controller.create(req, res);
            sinon.assert.calledWith(service.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            service.create.restore();
        }),
        it('should return status 500 on server error', (function () {
            sinon.stub(service,"create").yields(error);
            controller.create(req, res);
            sinon.assert.calledWith(service.create, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).send);
        }));
    });
