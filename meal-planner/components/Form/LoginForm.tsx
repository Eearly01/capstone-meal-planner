import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
    Container,
    Form,
    FormTitle,
    InfoText,
    InfoTextContainer,
    Link
} from './FormElements';
import InputField from './InputField';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import Button from '../Button';
import { loginUser } from '@/helpers';
import { AxiosError } from 'axios';

type Props = {}

const LoginForm = (props: Props) => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })
	const [loading, setLoading] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setData({ ...data, [e.target.name]: e.target.value });
		};

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const loginRes = await loginUser( {username: data.username, password: data.password} );

			if (loginRes && !loginRes.ok) {
				setSubmitError(loginRes.error || '');
			} else {
				router.push('/');
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorMsg = error.response?.data?.error;
				setSubmitError(errorMsg);
			}
		}

		setLoading(false);
	};

    return (
			<Container>
				<Form onSubmit={handleLogin}>
					<FormTitle> Login </FormTitle>

					<InputField
						placeholder='Username'
						type='username'
						name='username'
						icon={<AiOutlineMail />}
						value={data.username}
						onChange={handleInputChange}
						required
					/>

					<InputField
						placeholder='Password'
						type='password'
						icon={<AiOutlineUnlock />}
						value={data.password}
						onChange={handleInputChange}
						required
						name='password'
					/>

					<Link href='/forgot-password'>Forgot Password?</Link>

					<Button 
					type='submit' title='Login' 
					disabled={loading}
					/>

					<InfoTextContainer>
						<InfoText>New User?</InfoText>

						<Link href='/signup'>Create an Account</Link>
					</InfoTextContainer>
				</Form>
			</Container>
		);
}

export default LoginForm