import React from 'react'

const Box = (props) => {
  console.log(props)
  return (
    <div className='box'>
        <h1><b>Name:</b> {props.name}</h1>
        <p>{props.age}, {props.isMale ? 'Male' : 'Female'}</p>
    </div>
  )
}

export default Box