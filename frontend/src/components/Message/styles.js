import styled from "styled-components"

export const Container = styled.div`
        max-width: 1120px;
        margin: 1rem auto 0;
        padding: 1rem;     
`

export const Text = styled.div`
        padding: 1rem;
        border: #d9d9d9 1px solid;
        border-radius: 0.45rem;
        color: ${((props) => props.type === 'error' ? "#eb4f34" : "#64eb34")}        
`