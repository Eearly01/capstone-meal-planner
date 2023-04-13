import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin: 50px;
    flex-wrap: wrap;
`

export const Card = styled.div`
	display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.855) 5px 5px 13px 5px;
    flex-direction: column;
    padding: 20px;
    background-color: rgba(131, 123, 123, 0.489);
    border-radius: 10px;
    gap: 5px;
    margin-bottom: 20px;
    width: 200px;
    
`;
