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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

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
						icon={<AiOutlineMail />}
						value={username}
						onChange={handleUsernameChange}
						required
					/>

					<InputField
						placeholder='Password'
						type='password'
						icon={<AiOutlineMail />}
						value={password}
						onChange={handlePasswordChange}
						required
					/>

					<Link href='/forgot-password'>Forgot Password?</Link>

                    <Button 
                        type='submit'
                        title='login'
                    />

                    <InfoTextContainer>
                        <InfoText>
                            New User?
                        </InfoText>

                        <Link href='/signup'>
                            Create an Account
                        </Link>
                    </InfoTextContainer>
				</Form>
			</Container>
		);
}

export default LoginForm