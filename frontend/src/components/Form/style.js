import styled from "styled-components";

export const StyleImput = styled.input`
    width: 100%;
    padding: 0 1.5rem;
    height: 3.7rem;
    border-radius: 0.5rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem;
    margin-bottom: 0.7rem;
    &::placeholder {
      color: var(--text-body);
    }
    
    & + input {
      margin-top: 0.8rem;
    }

    :focus, :active{
      border: 1px solid var(--theme);
      background-color: #ebefff ;
    }
    transition: border 0.5s;

`