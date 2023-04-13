import { OpenAIStream, OpenAIStreamPayload } from '../../../utils/OpenAiStream';

type RequestData = {
	currentModel: string;
	message: string;
};

if (!process.env.OPENAI_API_KEY) {
	throw new Error('Missing env var from OpenAI');
}

export const runtime = 'edge';

export default async function handler(request: Request) {
	const { currentModel, message } = (await request.json()) as RequestData;

	if (!message) {
		return new Response('No message in the request', { status: 400 });
	}

	const payload: OpenAIStreamPayload = {
		model: `${currentModel}`,
		messages: [{ role: 'user', content: message }],
		temperature: 1,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 2048,
		stream: true,
		n: 1,
	};

	const stream = await OpenAIStream(payload);
	return new Response(stream);
}
