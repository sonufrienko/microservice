const supertest = require('supertest');
const app = require('../app');
const security = require('../helpers/security');

const tokenPayload = {
	jti: '123',
	email: 'test@example.com'
};

const delay = ms => setTimeout(() => Promise.resolve(), ms);

let request = null;
let server = null;

beforeAll(done => {
	server = app.listen(done);
	request = supertest.agent(server);
});

afterAll(done => {
	server.close(done);
});

test('Healthcheck', async () => {
	await request
		.get('/')
		.expect(200)
		.expect('Content-Type', /text/)
		.expect('ok');
});

test('Valid authorization', async () => {
	const token = await security.getSignedToken(tokenPayload);
	await request
		.get('/v1/users')
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect('Content-Type', /json/);
});

test('Without authorization header', async () => {
	await request.get('/v1/users').expect(401);
});

test('Expired token', async () => {
	const token = await security.getSignedToken(tokenPayload, {
		expiresIn: '100'
	});
	await delay(200);
	await request
		.get('/v1/users')
		.set('Authorization', `Bearer ${token}`)
		.expect(401);
});
