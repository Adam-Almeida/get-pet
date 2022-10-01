import { useEffect, useState } from 'react'
import { Container, Text } from './styles'

import bus from '../../utils/bus'

function Message() {
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
        bus.addListener('flash', (message, type) => {
            setVisibility(true)
            setMessage(message)
            setType(message.type)
            setTimeout(() => {
                setVisibility(false)
            }, 3000);
        })
    }, [])

    return (
        visibility && (
            <Container>
                <Text type={type}>{message.message}</Text>
            </Container>
        )
    )
}

export default Message