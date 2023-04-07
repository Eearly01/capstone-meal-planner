import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { getErrorMsg, loginUser } from '@/helpers';
import {
	Container,
	Form,
	FormTitle,
	InfoText,
	InfoTextContainer,
} from './FormElements';
import InputField from './InputField';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import Button from '../Button';
import Link from 'next/link';
import { InputErrors } from '@/types/error';
import { ErrorText } from './InputFieldElements';

const SignupForm = () => {
	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [validationErrors, setValidateErrors] = useState<InputErrors[]>([]);

	const [submitError, setSubmitError] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const validateData = (): boolean => {
		const err = [];

		if (data.username?.length < 4) {
			err.push({ username: 'Username must be at least 4 characters long' });
		} else if (data.username?.length > 30) {
			err.push({ username: 'Username must be shorter than 30 characters' });
		} else if (data.password?.length < 6) {
			err.push({ password: 'Password must be at least 6 characters long' });
		} else if (data.password !== data.confirmPassword) {
			err.push({ confirmPassword: "Passwords don't match" });
		}

        setValidateErrors(err)

		if (err.length > 0) {
			return false;
		} else {
			return true;
		}
	};

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isValid = validateData();

		if (isValid) {
			try {
				setLoading(true);
				const apiRes = await axios.post(
					'http://localhost:3000/api/auth/signup',
					data
				);

				if (apiRes?.data?.success) {
					const loginRes = await loginUser({
						username: data.username,
						password: data.password,
					});

					if (loginRes && !loginRes.ok) {
						setSubmitError(loginRes.error || '');
					} else {
						router.push('/');
					}
				}
			} catch (error: unknown) {
				if (error instanceof AxiosError) {
					const errorMsg = error.response?.data?.error;
					setSubmitError(errorMsg);
				}
			}
			setLoading(false);
		}
	};

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
    }

	return (
		<Container>
			<Form onSubmit={handleSignup}>
				<FormTitle> Sign Up </FormTitle>
				<InputField
					type='text'
					placeholder={'Username'}
					value={data.username}
					onChange={handleInputChange}
					icon={<BsPerson />}
					required
					name='username'
					error={getErrorMsg('username', validationErrors)}
				/>
				<InputField
					type='email'
					placeholder={'Email'}
					value={data.email}
					onChange={handleInputChange}
					icon={<AiOutlineMail />}
					required
					name='email'
				/>
				<InputField
					type='password'
					placeholder={'Password'}
					value={data.password}
					onChange={handleInputChange}
					icon={<AiOutlineUnlock />}
					required
					name='password'
					error={getErrorMsg('password', validationErrors)}
				/>
				<InputField
					type='confirmPassword'
					placeholder={'Confirm Password'}
					value={data.confirmPassword}
					onChange={handleInputChange}
					icon={<RiLockPasswordLine />}
					required
					name='confirmPassword'
					error={getErrorMsg('confirmPassword', validationErrors)}
				/>

				<Button 
                    title={'Sign up'}  
                    type={'submit'} 
                    disabled={loading}
                />

                {
                    submitError &&
                    <ErrorText>
                        {submitError}
                    </ErrorText>
                }

				<InfoTextContainer>
					<InfoText>Already have an account?</InfoText>
					<Link href={'/login'}>Login</Link>
				</InfoTextContainer>
			</Form>
		</Container>
	);
};

export default SignupForm;
