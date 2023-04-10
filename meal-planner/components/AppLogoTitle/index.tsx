import React from 'react';
import { AppTitle, Container } from './AppLogoTitleElements';

type Props = {};

const AppLogoTitle = (props: Props) => {
	return (
		<Container href='/'>
			<AppTitle> OV Travels </AppTitle>
		</Container>
	);
};

export default AppLogoTitle;
