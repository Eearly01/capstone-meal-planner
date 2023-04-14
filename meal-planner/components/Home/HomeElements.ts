import styled from 'styled-components';

export const SearchBar = styled.div`
	input {
		padding-left: 35px;
		color: $color-gray-one;
		box-shadow: 2px 3px 28px 1px rgba(0, 0, 0, 0.1);
		margin-top: 20px;
		margin-right: 10px;
		border: 2px solid lightgray;
		border-radius: 5px;

		height: 40px;
		font-size: 20px;

		transition: all 0.2s ease;

		&::placeholder {
			color: #b3b3b3;
		}

		&:focus {
			outline: none;
			box-shadow: 2px 3px 20px 1px rgba(0, 0, 0, 0.3);
		}
	}
	text-align: center;
	font-size: 20px;
	color: color-gray-two;
`;

export const Container = styled.div`
    width: 100%;
    align-items: center;

`