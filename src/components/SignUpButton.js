import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignUpButton = () => {

  return ( 
    <div>
      <Button variant="outline-warning" as={Link} to="/signup" >New Account</Button>
    </div>
  )
}

export default SignUpButton