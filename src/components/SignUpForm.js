import React, { useState } from 'react'
import usersService from '../services/users'
import { Button } from 'react-bootstrap'

const SignUpForm = ({ updateNotification }) => {
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = async (event) => {
    event.preventDefault()
    let newUserObject = {
      username: newUsername,
      name: newName,
      password: newPassword
    }
    try {
      await usersService.create(newUserObject)
      updateNotification(`User ${newName} was created!`, 'success')
    } catch (error) {
      console.log(error)
      updateNotification('Username is already taken', 'error')
    }
  }

  return (
    <div class="SignUpForm">
      <form onSubmit={handleSignUp}>
        Username
        <input 
        type="username"
        name="Username"
        value={newUsername}
        onChange={({ target }) => setNewUsername(target.value)}
        />
        Name
        <input 
        type="name"
        name="Name"
        value={newName}
        onChange={({ target }) => setNewName(target.value)}
        />
        Password
        <input 
        type="password"
        name="Password"
        value={newPassword}
        onChange={({ target }) => setNewPassword(target.value)}
        />
        Confirm Password
        <input 
        type="password"
        name="Confirm Password"
        value={confirmPassword}
        onChange={({ target }) => setConfirmPassword(target.value)}
        />
        <Button variant="outline-warning" type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm