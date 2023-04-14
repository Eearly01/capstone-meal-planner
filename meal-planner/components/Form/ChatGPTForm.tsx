import { useState, useEffect } from 'react';
import axios from 'axios';

type GptType = {
	question: string,
	answer: string
}

const ChatGPTForm = () => {
	// STATE

	const [newQuestion, setNewQuestion] = useState('');
	const [gptAnswer, setGptAnswer] = useState('');

	// HANDLERS

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewQuestion(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log(newQuestion)
		e.preventDefault();
		const apiResponse: any = await axios
			.post('http://localhost:3000/api/gpt/models/route', {
				question: newQuestion,
			})
		console.log(apiResponse.data)
		setGptAnswer(apiResponse.data)
	};

	useEffect(() => {
		newQuestion
	}, [newQuestion]);

	return (
		<div className='ChatGPTForm'>
			<aside className='sidemenu'>
				<h1 className='title'>Q&A</h1>
				<hr />
				<section>
					<p>{gptAnswer}</p>
				</section>
			</aside>
			<section className='chatbox'>
				<div className='chat-input-holder'>
					<form onSubmit={handleSubmit}>
						<input
							onChange={handleChange}
						></input>
					</form>
				</div>
			</section>
		</div>
	);
};

export default ChatGPTForm;
