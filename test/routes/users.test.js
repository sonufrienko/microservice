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

test('GET /users/123 - validate userID', async () => {
	const token = await security.getSignedToken(tokenPayload);
	await request(app)
		.get('/v1/users/123')
		.set('Authorization', `Bearer ${token}`)
		.expect(400)
		.expect('Content-Type', /json/);
});

test('GET /users/53fbf4615c3b9f41c381b6a3 - validate userID', async () => {
	const token = await security.getSignedToken(tokenPayload);
	await request(app)
		.get('/v1/users/53fbf4615c3b9f41c381b6a3')
		.set('Authorization', `Bearer ${token}`)
		.expect(200);
});
