import React from 'react'
import { Button, NavDropdown } from 'react-bootstrap'

const LogoutButton = ({user, setUser, setLoggedIn}) => {

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setLoggedIn(false)
  }

  if (user) {
    return (
      <NavDropdown.Item variant="dark">
        <Button  variant="outline-warning" onClick={handleLogout}>
          Logout
        </Button>
      </NavDropdown.Item>
    )
  }
}

export default LogoutButton