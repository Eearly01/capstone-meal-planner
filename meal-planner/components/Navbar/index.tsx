import React from "react"
import { IconContainer, Nav } from "./NavElement"
import {GiCook} from 'react-icons/gi'

const Navbar = () => {
    return (
        <Nav>
            <IconContainer>
                <GiCook
                width={50}
                height={50}
                />
            </IconContainer>
        </Nav>
    )
}

export default Navbar