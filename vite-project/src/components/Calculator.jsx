import React from 'react'

const Calculator = ({
    unitPrice,
    quantity,
    setQuantity,
    setTotalPrice,
    setUnitPrice,
}) => {
    console.log({unitPrice});
  return (
    <div>
        <div>
            <label htmlFor="u_price">Unit price</label>
            <input 
                type="number" 
                name="" 
                id="u_price" 
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="qty">Quantity</label>
            <input 
                type="number" 
                name="" 
                id="qty" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
        </div>
        <div>
            <button
            onClick={() => setTotalPrice(quantity * unitPrice)}
            >
                Calculate Total
            </button>          
        </div>
    </div>
  )
}

export default Calculator