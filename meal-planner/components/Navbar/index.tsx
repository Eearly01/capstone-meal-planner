import React, { useState } from "react"
import { 
    IconContainer, 
    MenuIcon, 
    Nav, 
    NavLinkContainer, 
    OverlayMenu,
    MenuLinkContainer,
    CloseButtonContainer,
    CloseIcon,
} from "./NavElement"
import {GiCook} from 'react-icons/gi'
import {BsFillPersonFill} from 'react-icons/bs'
import { WindowSize } from "@/types"
import { useWindowSize } from "@/hooks"
import NavLink from "./NavLink"

const Navbar = () => {

    const size: WindowSize = useWindowSize()
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        setShowMenu(true);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    return (    
        <Nav>

            <IconContainer>
                <NavLink route='/'>
                    <GiCook
                    width={50}
                    height={50}
                    />
                </NavLink>
            </IconContainer>

            <NavLinkContainer>
                {
                    size.width > 768 ?
                    <>
                        <NavLink route="/">
                            Home
                        </NavLink>
                        <NavLink route="/personal-page">
                            Personal Page
                        </NavLink>
                        <NavLink route="/gpt">
                            Ask ChatGPT
                        </NavLink>
                        <NavLink route="/profile">
                            <BsFillPersonFill />
                        </NavLink>
                    </>
                    :
                    <MenuIcon 
                        size={30} 
                        onClick={() => openMenu()}
                    />
                }
            </NavLinkContainer>
            {
                showMenu &&
                <OverlayMenu>
                    <CloseButtonContainer>
                        <CloseIcon 
                            size={40}
                            color={'white'}
                            onClick={closeMenu}
                        />
                    </CloseButtonContainer>
                    <MenuLinkContainer>
                        <NavLink route='/' onClick={closeMenu}>
                            Home
                        </NavLink>
                        <NavLink route="/personal-page" onClick={closeMenu}>
                            Personal Page
                        </NavLink>
                        <NavLink route="/gpt" onClick={closeMenu}>
                            Ask ChatGPT
                        </NavLink>
                        <NavLink route="/profile" onClick={closeMenu}>
                            <BsFillPersonFill />
                        </NavLink>
                    </MenuLinkContainer>
                </OverlayMenu>
            }
        </Nav>
    )
}

export default Navbar