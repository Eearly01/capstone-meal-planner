import React, { useState } from 'react';
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios';
import { loginUser } from '@/helpers';
import { Container, Form, FormTitle, InfoText, InfoTextContainer } from './FormElements';
import InputField from './InputField';
import { BsPerson } from 'react-icons/bs'
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri'
import Button from '../Button';
import Link from 'next/link';

const SignupForm = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [submitError, setSubmitError] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const validateData = (): boolean => {
        const err = [];

        if(data.password !== data.confirmPassword) {
            err.push({confirmPassword: "Passwords don't match"})
        }

        if(err.length > 0) {
            return false
        } else {
            return true
        }
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validateData()

        if(isValid) {

            try {
                setLoading(true)
                const apiRes = await axios.post('http://localhost:3000/api/auth/signup', data)

                if(apiRes?.data?.success) {
                    const loginRes = await loginUser({
                        email: data.email,
                        password: data.password
                    })
                    
                    if(loginRes && !loginRes.ok) {
                        setSubmitError(loginRes.error || '')
                    } else {
                        router.push('/')
                    }
                }
            } catch (error: unknown) {
                if(error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    setSubmitError(errorMsg)
                }
            }
            setLoading(false)
        }
    }

    return (
			<Container>
				<Form onSubmit={handleSignup}>
					<FormTitle> Sign Up </FormTitle>
					<InputField
						type='text'
						placeholder={'Username'}
						value={data.username}
						onChange={(e) => setData(e.target.value)}
						icon={<BsPerson />}
						required
					/>
					<InputField
						type='text'
						placeholder={'Email'}
						value={data.email}
						onChange={(e) => setData(e.target.value)}
						icon={<AiOutlineMail />}
						required
					/>
					<InputField
						type='text'
						placeholder={'Password'}
						value={data.password}
						onChange={(e) => setData(e.target.value)}
						icon={<AiOutlineUnlock />}
						required
					/>
					<InputField
						type='text'
						placeholder={'Confirm Password'}
						value={data.confirmPassword}
						onChange={(e) => setData(e.target.value)}
						icon={<RiLockPasswordLine />}
						required
					/>

                    <Button 
                        title={'Sugn up'}
                        type={'submit'}
                    />

                    <InfoTextContainer>
                        <InfoText>
                            Already have an account?
                        </InfoText>
                        <Link href={'/login'}>
                            Login
                        </Link>
                    </InfoTextContainer>
				</Form>
			</Container>
		);

}

export default SignupForm