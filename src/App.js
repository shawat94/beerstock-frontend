import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import { NavDropdown, Button, Alert } from 'react-bootstrap'
import TapItem from './components/TapItem.js'
import styles from "./App.module.css";
import loginService from './services/login'
import tapsService from './services/taps'
import usersService from './services/users'
import Home from './pages/Home'
import Create from './pages/Create'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import LogoutButton from './components/LogoutButton.js';
import SignUpButton from './components/SignUpButton.js';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [taps, setTaps] = useState([])
  const [loggedIn, setLoggedIn] = useState(null)
  const [notification, setNotification] = useState({type: '', message: ''})

  useEffect(async () => {
    console.log(JSON.parse(localStorage.getItem('loggedInUser')))
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (loggedInUser) {
      let currentUser = await usersService.get(loggedInUser.id)
      let userTaps = currentUser.taps
      setTaps(userTaps)
      setUser(currentUser)
      tapsService.setToken(loggedInUser.token)
    } else {
      setUser(null)
      setTaps([])
    }
    console.log(taps)
  }, [loggedIn])

  const updateNotification = (message, type) => {
    setNotification({message: message, type: type})
    console.log(notification)
    setTimeout(() => {
      setNotification({message: '', type: ''})
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Logging in with username ${username} and password ${password}`)

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      tapsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setLoggedIn(true)
      updateNotification(`Logged in as ${username}!`, 'success')
    } catch (error) {
      updateNotification('Wrong username or password', 'alert')
    }
  }

  const LoginForm = () => (
    <div className="login-form">
      <div className="login-fields">
        <div>
          Username
            <input
            id="login-username-field"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
            <input
            id="login-password-field"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </div>
      <NavDropdown.Item>
        <Button variant="outline-warning" onClick={handleLogin}>Login</Button>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <SignUpButton />
      </NavDropdown.Item>
    </div>
    )

  return (
    <Router>
      <Header  LoginForm={LoginForm} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />

      {notification.type ? <Alert variant={notification.type === 'error' ? 'danger' : 'success'}>{notification.message}</Alert> : null}

      <Routes>
        <Route path='/create' element={<Create updateNotification={updateNotification} />} />
        <Route path='/signup' element={<SignUp updateNotification={updateNotification} />} />
        <Route path='/' element={<Home styles={styles} LoginForm={LoginForm} user={user} taps={taps} setTaps={setTaps}/>} />
      </Routes>

    </Router>
  );
}

export default App;
