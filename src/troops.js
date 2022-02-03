const { randomNumber } = require('./util.js');

exports.handler = async (event) => {
	
	if (!event.queryStringParameters) {
		return {
			statusCode: 400,
			body: 'Bad request'
		};
	}

	// make sure the request is a GET
	if (event.httpMethod !== 'GET') {
		return {
			statusCode: 405,
			body: 'Method not allowed'
		};
	}

	// // make sure the request is for the correct path
	// if (event.path !== '/troops') {
	// 	return {
	// 		statusCode: 404,
	// 		body: 'Not '
	// 	};
	// }

	const queries = event.queryStringParameters;
	const count = queries.count ? parseInt(queries.count) : 1;
	const total = queries.total ? parseInt(queries.total) : 100;
	const nums = randomNumber(count, total);
	return {
		statusCode: 200,
		body: JSON.stringify(nums),
	};

}