import React from 'react'

function Input(props) {
  return (
    <>
    <input style={{border:"1px solid black"}} type="text" {...props} />
    </>
  )
}

export default Input
