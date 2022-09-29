import { StyleImput } from './style'

function Imput({ text, type, name, placeholder, onChange }) {
    return (
        <>
            <label>{text}</label>
            <StyleImput onChange={onChange} type={type} name={name} placeholder={placeholder} />
        </>
    )
}

export default Imput