import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
    align-items: center;
	height: 100%;
`;

export const SideMenu = styled.aside`
	flex: 1;
	padding: 1rem;
    width: 100%;
	background-color: #f2f2f2;
`;

export const Title = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 1rem;
    align-self: center;
`;

export const Separator = styled.hr`
	border: none;
	border-top: 1px solid #ccc;
	margin: 1rem 0;
`;

export const Content = styled.section`
	flex: 3;
	padding: 1rem;
    width: 50%;
`;

export const ChatInputHolder = styled.div`
	margin-bottom: 1rem;
`;

export const ChatInput = styled.input`
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100%;
`;

interface ResponseProps {
	loading?: boolean;
}

export const Response = styled.p<ResponseProps>`
	font-size: 18px;
	margin-top: 20px;
	opacity: ${({ loading }) => (loading ? 0.5 : 1)};
	pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
`;