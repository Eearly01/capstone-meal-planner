import styled from 'styled-components'
import Link from "next/link"

export const Nav = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25)
`

export const IconContainer = styled.div`
    padding-left: 1rem;
`
export const NavLinkContainer = styled.div`
    display: flex;
    align-items: center;
`

export const NavLink = styled(Link)`
    padding: 1rem;
    margin: 1rem;

    &:hover {
        color: #a6a2a2;
    }
`