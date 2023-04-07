import React, { useState } from 'react';
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

type Props = {}

const LoginForm = (props: Props) => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setData({ ...data, [e.target.name]: e.target.value });
		};

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

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
						icon={<AiOutlineMail />}
						value={data.password}
						onChange={handleInputChange}
						required
						name='password'
					/>

					<Link href='/forgot-password'>Forgot Password?</Link>

					<Button type='submit' title='login' />

					<InfoTextContainer>
						<InfoText>New User?</InfoText>

						<Link href='/signup'>Create an Account</Link>
					</InfoTextContainer>
				</Form>
			</Container>
		);
}

export default LoginForm