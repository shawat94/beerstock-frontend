import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'

const Header = ({LoginForm, user, setLoggedIn, setUser}) => {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to='/'>
          BeerStock
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to='/create'>
            New Tap
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown menuVariant="dark" title={user ? user.username : "Login"}>
            {!user ? LoginForm() : <LogoutButton user={user} setLoggedIn={setLoggedIn} setUser={setUser} />}
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  )
}
export default Header