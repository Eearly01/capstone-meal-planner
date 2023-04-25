import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    align-items: center;

`

interface PgButtonProps {
	disabled: boolean;
}

export const PageButtons = styled.div<PgButtonProps>`
	display: ${(props) => (props.disabled ? 'none' : 'flex')};
	justify-content: space-around;
	* {
		margin: 0 1.5rem;
	}
`;
