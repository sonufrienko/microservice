const request = require('supertest');
const app = require('../../app');
const security = require('../../helpers/security');
const mongo = require('../../db/mongo');

const route = '/v1/users';

const tokenPayload = {
	jti: '123',
	email: 'test@example.com'
};

const validUserData = {
	email: 'test@example.com'
};

const invalidUserData = {
	mail: 'test@example.com'
};

describe(route, () => {
	let userID = null;
	let token = null;

	beforeAll(async () => {
		await mongo.connectWithRetry();
		token = await security.getSignedToken(tokenPayload);
		userID = await request(app)
			.post(route)
			.set('Authorization', `Bearer ${token}`)
			.send(validUserData)
			.then(res => res.body.id);
	});

	test(`POST ${route}`, async () => {
		await request(app)
			.post(route)
			.set('Authorization', `Bearer ${token}`)
			.send(validUserData)
			.expect(200)
			.expect('Content-Type', /json/)
			.then(res => {
				expect(res.body).toHaveProperty('id');
			});
	});

	test(`POST ${route} - invalid data`, async () => {
		await request(app)
			.post(route)
			.set('Authorization', `Bearer ${token}`)
			.send(invalidUserData)
			.expect(400)
			.expect('Content-Type', /json/)
			.then(res => {
				expect(res.body).toHaveProperty('error');
			});
	});

	test(`GET ${route}`, async () => {
		await request(app)
			.get(route)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(res => {
				expect(Array.isArray(res.body)).toBeTruthy();
				const [firstItem] = res.body;
				expect(firstItem).toHaveProperty('id');
				expect(firstItem).toHaveProperty('email');
			});
	});

	test(`GET ${route}/<userID>`, async () => {
		await request(app)
			.get(`${route}/${userID}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect(res => {
				expect(res.body).toHaveProperty('id');
				expect(res.body).toHaveProperty('email');
			});
	});

	test(`GET ${route}/<userID> - invalid data`, async () => {
		await request(app)
			.get(`${route}/111`)
			.set('Authorization', `Bearer ${token}`)
			.expect(400)
			.expect('Content-Type', /json/)
			.expect(res => {
				expect(res.body).toHaveProperty('error');
			});
	});
});
