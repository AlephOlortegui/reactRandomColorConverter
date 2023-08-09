import { Link } from 'react-router-dom'
import '../styles/Nav.css';
import NavLink from '../utilities/NavLink';
// <i className="bi bi-brightness-high-fill"></i> 
// <i className="bi bi-moon-fill"></i>;

const Nav = () => {
  return (
    <nav>
        <div className="nav-center">
            <NavLink to="/"><h4>Colors</h4></NavLink>
            <ul className="nav-links">
                <li><NavLink to="/random">random</NavLink></li>
                <li><NavLink to="/switch">Switch</NavLink></li>
            </ul>
        </div>
    </nav>
  )
}

export default Nav