import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    width:250,
    padding: 10,
    borderWidth: 1
  }
  let weird = Object.values(props).map(e => e).join("");
  return (
    <div style={style}>
      {weird}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.message) return state.message
}

export default connect(mapStateToProps)(Notification)