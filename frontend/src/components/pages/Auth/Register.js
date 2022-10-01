import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import Imput from "../../Form/Input"
import { Form } from "./style"

import { Context } from '../../../context/UserContext'

function Register() {

    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(user)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Registrar novo Usuário</h1>
            <br />

            <Imput
                text="Nome"
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Digite o seu nome"
            />
            <div className='twoInputs'>
                <span>
                    <Imput
                        text="Telefone"
                        type="text"
                        name="phone"
                        placeholder="Digite o seu telefone"
                        onChange={handleInputChange}
                    />
                </span>
                <span>
                    <Imput
                        text="E-mail"
                        type="email"
                        name="email"
                        placeholder="Digite o seu e-mail"
                        onChange={handleInputChange}
                    />
                </span>
            </div>
            <Imput
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite a sua senha"
                onChange={handleInputChange}
            />
            <Imput
                text="Confirmação de senha"
                type="password"
                name="confirmPassword"
                placeholder="Confirme a sua senha"
                onChange={handleInputChange}
            />
            <button type="submit">Cadastrar</button>

            <p>
                Já tem conta? <Link to="/login">Clique aqui.</Link>
            </p>
        </Form>
    )
}

export default Register