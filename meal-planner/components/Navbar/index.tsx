import React, { useState } from 'react';
import {
	IconContainer,
	MenuIcon,
	Nav,
	NavLinkContainer,
	OverlayMenu,
	MenuLinkContainer,
	CloseButtonContainer,
	CloseIcon,
} from './NavElement';
import { GiCook } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import { WindowSize } from '@/types';
import { useWindowSize } from '@/hooks';
import NavLink from './NavLink';
import { useSession } from 'next-auth/react';

const Navbar = () => {
	const size: WindowSize = useWindowSize();
	const [showMenu, setShowMenu] = useState(false);
	const { data: session } = useSession();

	const openMenu = () => {
		setShowMenu(true);
	};

	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<Nav>
			<IconContainer>
				<NavLink route='/'>
					<GiCook size={50} />
				</NavLink>
			</IconContainer>

			<NavLinkContainer>
				{size.width > 768 ? (
					<>
						<NavLink route='/'>Home</NavLink>
						<NavLink route='/personal-page'>Personal Page</NavLink>
						<NavLink route='/gpt'>Ask ChatGPT</NavLink>

						{session ? (
							<NavLink route='/profile'>
								<BsFillPersonFill size={30} />
							</NavLink>
						) : (
							<NavLink route='/login'>Login</NavLink>
						)}
					</>
				) : (
					<MenuIcon size={30} onClick={() => openMenu()} />
				)}
			</NavLinkContainer>
			{showMenu && (
				<OverlayMenu>
					<CloseButtonContainer>
						<CloseIcon size={40} onClick={closeMenu} />
					</CloseButtonContainer>
					<MenuLinkContainer>
						<NavLink route='/' onClick={closeMenu} large color='white'>
							Home
						</NavLink>
						<NavLink
							route='/personal-page'
							onClick={closeMenu}
							large
							color='white'>
							Personal Page
						</NavLink>
						<NavLink route='/gpt' onClick={closeMenu} large color='white'>
							Ask ChatGPT
						</NavLink>
						<NavLink route='/profile' onClick={closeMenu} large color='white'>
							<BsFillPersonFill />
						</NavLink>
					</MenuLinkContainer>
				</OverlayMenu>
			)}
		</Nav>
	);
};

export default Navbar;
