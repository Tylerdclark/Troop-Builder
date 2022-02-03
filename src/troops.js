const { randomNumber } = require("./util.js");

exports.handler = async (event) => {
    // throw 400 if no count or total or they are not numbers
    if (!event.queryStringParameters.count || !event.queryStringParameters.total) {
        return {
            statusCode: 400,
            body: "Bad request - missing count and total",
        };
    }

	if(isNaN(event.queryStringParameters.count) || isNaN(event.queryStringParameters.total)){
		return {
			statusCode: 400,
			body: "Bad request - count and total must be numbers",
		};
	}

    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            body: "Method " + event.httpMethod + " not allowed",
        };
    }

    const queries = event.queryStringParameters;
    const count = parseInt(queries.count);
    const total = parseInt(queries.total);
    const nums = randomNumber(count, total);
    return {
        statusCode: 200,
        body: JSON.stringify(nums),
    };
};
