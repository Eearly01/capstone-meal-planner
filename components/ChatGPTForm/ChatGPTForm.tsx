import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button';
import {
	Container,
	SideMenu,
	Title,
	Separator,
	Content,
	ChatInputHolder,
	ChatInput,
	Response,
} from './ChatFormStyles';

const ChatGPTForm = () => {
	// STATE

	const [newQuestion, setNewQuestion] = useState('');
	const [gptAnswer, setGptAnswer] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// HANDLERS

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewQuestion(e.target.value);
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement> | null,
		question = newQuestion
	) => {
		console.log(question);
		e?.preventDefault();
		setIsLoading(true);
		const apiResponse: any = await axios.post(`/api/gpt/models/route`, {
			question,
		});
		console.log(apiResponse.data);
		setGptAnswer(apiResponse.data);
		setIsLoading(false);
	};

	useEffect(() => {
		newQuestion;
	}, [newQuestion]);

	return (
		<Container>
			<SideMenu>
				<Title>Q&amp;A</Title>
				<Separator />
				<section>
					<Response>{isLoading ? 'Loading...' : gptAnswer}</Response>
				</section>
			</SideMenu>
			<Content>
				<ChatInputHolder>
					<form onSubmit={handleSubmit}>
						<ChatInput onChange={handleChange} placeholder='What is a good dish for summer?' />
					</form>
					<Button
						title='Submit'
						type='submit' 
						disabled={isLoading}
					/>
				</ChatInputHolder>
				<Button
					title='Give Me Random a Dish!'
					disabled={isLoading}
					onClick={() => handleSubmit(null, 'please give me a dish')}
				/>
			</Content>
		</Container>
	);
};

export default ChatGPTForm;
