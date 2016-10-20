'use strict';

var app = require('../..');
import request from 'supertest';

var newProcess;

describe('Process API:', function() {

  describe('GET /api/processes', function() {
    var processs;

    beforeEach(function(done) {
      request(app)
        .get('/api/processes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          processs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      processs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/processes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/processes')
        .send({
          name: 'New Process',
          info: 'This is the brand new process!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProcess = res.body;
          done();
        });
    });

    it('should respond with the newly created process', function() {
      newProcess.name.should.equal('New Process');
      newProcess.info.should.equal('This is the brand new process!!!');
    });

  });

  describe('GET /api/processes/:id', function() {
    var process;

    beforeEach(function(done) {
      request(app)
        .get('/api/processes/' + newProcess._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          process = res.body;
          done();
        });
    });

    afterEach(function() {
      process = {};
    });

    it('should respond with the requested process', function() {
      process.name.should.equal('New Process');
      process.info.should.equal('This is the brand new process!!!');
    });

  });

  describe('PUT /api/processes/:id', function() {
    var updatedProcess;

    beforeEach(function(done) {
      request(app)
        .put('/api/processes/' + newProcess._id)
        .send({
          name: 'Updated Process',
          info: 'This is the updated process!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProcess = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProcess = {};
    });

    it('should respond with the updated process', function() {
      updatedProcess.name.should.equal('Updated Process');
      updatedProcess.info.should.equal('This is the updated process!!!');
    });

  });

  describe('DELETE /api/processes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/processes/' + newProcess._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when process does not exist', function(done) {
      request(app)
        .delete('/api/processes/' + newProcess._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
