import React from "react"
import { IconContainer, Nav, NavLink, NavLinkContainer } from "./NavElement"
import {GiCook} from 'react-icons/gi'

const Navbar = () => {
    return (
        <Nav>

            <IconContainer>
                <NavLink href='/'>
                    <GiCook
                    width={50}
                    height={50}
                    />
                </NavLink>
            </IconContainer>

            <NavLinkContainer>
                <NavLink href="/">
                    Home
                </NavLink>
                <NavLink href="/personal-page">
                    Personal Page
                </NavLink>
                <NavLink href="/gpt">
                    Ask ChatGPT
                </NavLink>
            </NavLinkContainer>
            
        </Nav>
    )
}

export default Navbar