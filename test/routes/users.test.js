const request = require('supertest');
const app = require('../../app');
const security = require('../../helpers/security');

const tokenPayload = {
	jti: '123',
	email: 'test@example.com'
};

test('GET /users', async () => {
	const token = await security.getSignedToken(tokenPayload);
	const response = await request(app)
		.get('/v1/users')
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect('Content-Type', /json/);

	expect(Array.isArray(response.body)).toBeTruthy();
});
