import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import { NavDropdown, Button } from 'react-bootstrap'
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
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const LoginForm = () => (
    <div className="login-form">
      <div className="login-fields">
        <div>
          Username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
            <input
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

      <Routes>
        <Route path='/create' element={<Create />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home styles={styles} LoginForm={LoginForm} user={user} taps={taps} setTaps={setTaps}/>} />
      </Routes>

    </Router>
  );
}

export default App;
