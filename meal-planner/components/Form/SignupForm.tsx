import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios';
import { loginUser } from '@/helpers';

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



}