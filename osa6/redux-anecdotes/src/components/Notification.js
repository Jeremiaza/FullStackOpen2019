import React from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    width:250,
    padding: 10,
    borderWidth: 1,
    backgroundColor:'lightgreen'
  }
  return (
    <div style={style}>
      Success!
    </div>
  )
}

export default Notification