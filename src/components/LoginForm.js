import React from 'react'

  const LoginForm = () => {
    if (!user) { 
      return (
        <form id="login-form" onSubmit={handleLogin}>
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
          <button id="login-submit-button" type="submit">Login</button>
        </form>      
        )
      }
    }

export default LoginForm