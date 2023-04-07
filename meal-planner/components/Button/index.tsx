import React from 'react'
import { Container } from './ButtonElements'
import { ButtonPorps } from '@/types/propTypes'

const Button = ({title, type}: ButtonPorps) => {
    return (
        <Container type={type}>
            {title}
        </Container>
    )
}

export default Button