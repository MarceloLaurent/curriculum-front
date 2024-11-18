import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
    display: inline-flex; 
    justify-content: center; 
    align-items: center; 
    white-space: nowrap; 
    background: #156082;
    border-radius: 22px;
    color: #FFFFFF;
    padding: 2px 12px; 
    width: 120px; 
    margin-right: 10px;
    font-size: 16px; 
    font-weight: bold; 

    ${({variant}) => variant !== "primary" && css`
        min-width: 60px;

        background: #DC143C;

        &::after {
            content: '';
            position: absolute;
            border: 1px solid #0000FF;
            top: -5px;
            left: -6px;
            width: calc(100% + 10px);
            height: calc(100% + 10px);
            border-radius: 2px;
        }
    `}
`;
