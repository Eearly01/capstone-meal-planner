import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	margin: 30px 5px 5px 0px;
`;

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.5);
	border-radius: 10px;
	padding: 20px;
	background-color: #f8f8f8;
	margin-bottom: 20px;
	width: 250px;
	overflow: hidden;
`;

export const ImageStyle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
	width: 100%;
	height: 150px;
	overflow: hidden;
	border-radius: 10px;

	img {
		width: auto;
		height: auto;
		object-fit: cover;
	}
`;

export const Title = styled.h3`
	font-size: 1.2rem;
	font-weight: 500;
	margin-bottom: 10px;
	text-align: center;
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	width: 100%;
`;