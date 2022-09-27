import { useState } from "react"
import Imput from "../../Form/Input"
import { Form } from "./style"

function Register() {
    const [user, setUser] = useState({})

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(user)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Ei, efetue seu cadastro para poder oferecer ou adotar um Pet!</h2>
            <Imput type="text" text="Nome" name="name" placeholder="Digite seu nome" />
            <Imput type="text" text="Telefone" name="phone" placeholder="Digite seu telefone" />
            <Imput type="email" text="Email" name="email" placeholder="Digite seu email" />
            <Imput type="password" text="Senha" name="password" placeholder="Digite sua senha" />
            <Imput type="password" text="Confirmação de Senha" name="confirmPassword" placeholder="Confirme sua senha" />
            <button type="submit" onChange={handleOnChange}>Cadastrar</button>
        </Form>
    )
}

export default Register