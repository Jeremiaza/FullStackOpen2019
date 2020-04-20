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
      <h2 style={{marginTop:10}}>Login to Blog App</h2>

      <form onSubmit={handleSubmit}>
        <div style={{margin:5, width:200}}>
          username
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div style={{margin:5, width:200}}>
          password
          <input
            id='pass'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='logintoapp' type="submit" style={{margin:5}}><b>login</b></button>
      </form>
    </div>
  )
}

export default LoginForm