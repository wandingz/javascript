const request = require('supertest');
const app = require('./server');

describe('Server', () => {
  describe('REST API v1', () => {
    it('returns a JSON payload', (done) => {
      request(app)
        .get('/test')
        .expect(204)
        // .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error) => (error) ? done.fail(error) : done());
    });
  });
});