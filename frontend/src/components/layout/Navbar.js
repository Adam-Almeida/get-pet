import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'

function Navbar() {
    return (
        <nav>
            <div>
                <img src={Logo} alt='Adote Um Pet' />
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                <li>
                    <Link to="/login">Logar</Link>
                </li>
                <li>
                    <Link to="/register">Cadastrar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar