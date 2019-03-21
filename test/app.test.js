const request = require('supertest');
const app = require('../app');

// test healthchecks
// test midlewares
// test common headers
// test authorization
// test 404 response

test('App start', async () => {
	await request(app)
		.get('/')
		.expect(200)
		.expect('Content-Type', /json/);
});
