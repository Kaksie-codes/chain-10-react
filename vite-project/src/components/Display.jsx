import React from 'react'

const Display = ({price, qty, total}) => {
  return (
    <div>
        <h1>Unit Price: {price}</h1>
        <h1>Quantity: {qty}</h1>
        <h1>Total Price: {total}</h1>
    </div>
  )
}

export default Display