const supertest = require('supertest');
const app = require('../../app');
const security = require('../../helpers/security');

const tokenPayload = {
	jti: '123',
	email: 'test@example.com'
};

let request = null;
let server = null;

beforeAll(done => {
	server = app.listen(done);
	request = supertest.agent(server);
});

afterAll(done => {
	server.close(done);
});

test('GET /users', async () => {
	const token = await security.getSignedToken(tokenPayload);
	const response = await request
		.get('/v1/users')
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect('Content-Type', /json/);

	expect(Array.isArray(response.body)).toBeTruthy();
});
