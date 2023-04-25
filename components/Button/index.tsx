import React from 'react'
import { Container } from './ButtonElements'
import { ButtonProps } from '@/types/propTypes'

const Button = ({title, type, disabled, onClick}: ButtonProps) => {
    return (
        <Container 
        type={type}
        disabled={disabled}
        onClick={onClick}
        >
            {title}
        </Container>
    )
}

export default Button