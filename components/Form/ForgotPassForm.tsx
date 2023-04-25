import React, { useState } from 'react'
import {
    Container,
    Form,
    FormTitle
} from './ForgotPasswordElement'
import InputField from './InputField'
import { AiOutlineMail } from 'react-icons/ai'
import Button from '../Button'

const ForgotPassForm = () => {
    const [email, setEmail] = useState('')

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return (
        <Container>
            <Form>
                <FormTitle> Forgot Password </FormTitle>
                <InputField
                    placeholder={'Email'}
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                    icon={<AiOutlineMail />}
                    required
                />

                <Button 
                    title={'Submit'}
                    type='submit'
                />
            </Form>
        </Container>
    )
}

export default ForgotPassForm