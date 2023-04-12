import React from 'react';
import Button from '../Button';
import { Container, UserEmail, UserName, Wrapper } from './UserProfileElements';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

const UserProfile = () => {
	const { data: session }: any = useSession();

	const deleteUser = async () => {
		const userId = session.user._id;
		const apiRes = await axios.put(
			`http://localhost:3000/api/${userId}/delete`,
			userId
		);
		return apiRes;
	};

	return (
		<Container>
			<Wrapper>
				{session && (
					<>
						<UserName>{`Hello ${session?.user?.fullname}`}</UserName>
						<UserEmail>{session?.user?.email}</UserEmail>

						<Button title='Logout' onClick={signOut} />
						<Button
							title='DELETE User'
							onClick={deleteUser}
						/>
					</>
				)}
			</Wrapper>
		</Container>
	);
};

export default UserProfile;
