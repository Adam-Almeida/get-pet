import styled from "styled-components";

export const Form = styled.form`
  background-color: red;
  padding: 7rem;
  border-radius: 0.5rem;
  background-color: var(--shape);
  margin-top: 1rem;

  @media (max-width: 720px) {
    padding: 2rem;

  }

  label{
      color: var(--text-body);
    }

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .twoInputs{
    display: flex;
    justify-content: space-between;

    span{
      width: 100%;
      flex-direction: column;
      & + span {
        margin-left: 0.8rem;
      }
    }

    @media (max-width: 720px) {
      display: inline;
      span + span {
        margin-left: 0;
      }
    }
  }

  p{
    margin-top: 1rem;
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    background: var(--green);
    color: #ffffff;
    border-radius: 0.5rem;
    height: 4rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;