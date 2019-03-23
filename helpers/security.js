const fs = require('fs');
const jwt = require('jsonwebtoken');

const JWT_PRIVATE_KEY = fs.readFileSync('private.key');

const getSignedToken = (payload, jwtOptions) =>
	new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			JWT_PRIVATE_KEY,
			{
				...jwtOptions,
				algorithm: 'RS256'
			},
			(err, token) => (err ? reject(err) : resolve(token))
		);
	});

module.exports = {
	getSignedToken
};
