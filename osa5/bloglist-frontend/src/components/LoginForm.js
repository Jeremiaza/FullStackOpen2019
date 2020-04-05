import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login to Blog App</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='pass'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='logintoapp' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm