import randomNumber from './util.mjs';

export async function handler(event) {
	const queries = event.queryStringParameters;
	const count = queries.count ? parseInt(queries.count) : 1;
	const total = queries.total ? parseInt(queries.total) : 100;
	const nums = randomNumber(count, total);
	return {
		statusCode: 200,
		body: JSON.stringify(nums),
	};
}