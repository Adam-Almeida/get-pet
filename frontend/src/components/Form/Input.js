import {StyleImput} from './style'

function Imput({text, type, name, placeholder}) {
    return(
        <>
        <label>{text}</label>
        <StyleImput type={type} name={name} placeholder={placeholder}>
        </StyleImput>
        </>
    )
}

export default Imput