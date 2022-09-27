import { Link } from 'react-router-dom'
import Logo from '../../../assets/img/logo.png'
import { Container, Content } from './styles'

import MenuButton from '../../Button/Button'
import { RiHeartAddFill, RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri'

function Navbar() {
    return (
        <Container>
            <Content>
                <img src={Logo} alt='Adote Um Pet' />
                <span>
                    <Link to="/">
                        <MenuButton text="ADOTAR">
                            <RiHeartAddFill color="#ffffff" />
                        </MenuButton>
                    </Link>
                    <Link to="/login">
                        <MenuButton text="LOGIN">
                            <RiLoginCircleLine color="#ffffff" />
                        </MenuButton>
                    </Link>
                    <Link to="/register">
                        <MenuButton text="REGISTRAR">
                            <RiUserAddLine color="#ffffff" />
                        </MenuButton>
                    </Link>
                </span>
            </Content>
        </Container>
    )
}

export default Navbar