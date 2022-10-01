import api from '../utils/api'
import useFlashMessage from './useFlashMessage'

// import { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'

export default function useAuth() {

    const {setFlashMessage} = useFlashMessage()

    async function register(user) {
        let messageText = "Cadastro realizado com sucesso"
        let messageType = "success"

        try {
                await api.post('/users/register', user).then((response) => {
                return response.data
            })          
        } catch (error) {
            messageText = error.response.data.msg
            messageType = "error"
        }

        setFlashMessage(messageText, messageType)
    }

    return { register }
}