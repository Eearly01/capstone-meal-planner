import React from 'react';
import { SearchBarContainer } from './SearchBoxStyle';
import { EthButton } from '../Button/EthButton';


type Props = {
	formSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ formSubmit, handleInputChange }: Props) => {

	return (
        <SearchBarContainer>					
            <form onSubmit={formSubmit}>
                Search: <input type='text' name='query' onChange={handleInputChange} />
                <EthButton
                    text={'Submit'}
                    label={'Button'}
                    onClick={() => {
                        <input type='submit' value='Submit' />;
                    }}
                />
            </form>
		</SearchBarContainer>
	);
};

export default SearchBar;
