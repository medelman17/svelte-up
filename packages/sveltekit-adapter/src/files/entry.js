import {getRawBody} from '@sveltejs/kit/node';

// @ts-expect-error will be resolve by https://github.com/sveltejs/kit/pull/2285
import {init, render} from '../output/server/app.js';

init();

export default async (request, res) => {
	const {pathname, searchParams} = new URL(request.url || '', 'http://localhost');

	let body;

	try {
		body = await getRawBody(request);
	} catch (error) {
		res.statusCode = error.status || 400;
		return res.end(error.reason || 'Invalid request body');
	}

	const rendered = await render({
		method: request.method,
		headers: request.headers,
		path: pathname,
		query: searchParams,
		rawBody: body,
	});

	if (rendered) {
		const {status, headers, body} = rendered;
		return res.writeHead(status, headers).end(body);
	}

	return res.writeHead(404).end();
};
