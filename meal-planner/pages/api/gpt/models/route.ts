import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { question } = req.body;
	console.log(question);

	const headers = {
		headers: { Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
	};

	axios
		.post(
			'https://api.openai.com/v1/completions',
			{
				prompt: `${question}`,
				model: 'text-davinci-003',
				max_tokens: 50,
				temperature: 1.0,
			},
			headers
		)
		.then((response: any) => {
			const answer = response.data.choices[0].text;
			res.send(answer); // send the answer back to the client
		})
		.catch((error: any) => {
			console.error(error);
			res.status(500).send('Something went wrong'); // send an error response if there was an error
		});
};

export default Handler;
