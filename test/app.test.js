const request = require('supertest');
const app = require('../app');
const security = require('../helpers/security');
const mongo = require('../db/mongo');

const tokenPayload = {
	jti: '123',
	email: 'test@example.com'
};

const delay = ms => setTimeout(() => Promise.resolve(), ms);

describe('Server', () => {
	beforeAll(async () => {
		await mongo.connectWithRetry();
	});

	test('Healthcheck', async () => {
		await request(app)
			.get('/healthcheck')
			.expect(200)
			.expect('Content-Type', /json/)
			.then(res => {
				expect(res.body.mongodb).toBeTruthy();
				expect(res.body.uptime).toBeGreaterThan(0);
			});
	});

	test('Valid authorization', async () => {
		const token = await security.getSignedToken(tokenPayload);
		await request(app)
			.get('/v1/users')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /json/);
	});

	test('Without authorization header', async () => {
		await request(app)
			.get('/v1/users')
			.expect(401);
	});

	test('Expired token', async () => {
		const token = await security.getSignedToken(tokenPayload, {
			expiresIn: '100'
		});
		await delay(200);
		await request(app)
			.get('/v1/users')
			.set('Authorization', `Bearer ${token}`)
			.expect(401);
	});
});
