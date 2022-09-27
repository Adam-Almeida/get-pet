import styled from "styled-components";

export const Button = styled.button`
        font-size: 0.8rem;
        color: #ffffff;
        background-color: var(--theme);
        border-radius: 0.8rem;
        padding: 0 1rem;
        margin: 0 0.2rem;
        height: 3rem;
        border: 0;
        transition: filter 0.2s;
        &:hover{
            filter: brightness(1.2);
        }

        display: flex;
        justify-content: space-between;
        align-items: center;

        transition: filter 0.2s;

        svg {
            width: 18px;
            height: 18px;
        }

        svg:first-child {
            margin-right: 1rem;
        }

        &:hover {
            filter: brightness(0.8);
        }
`