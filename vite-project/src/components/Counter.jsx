import React, { useEffect, useState } from 'react'

const Counter = () => {
    // const [count, setCount] = React.useState(0);
    let [count, setCount] = useState(0);
    let [randomIndex, setRandomIndex] = useState(0);

    useEffect(() => {
        console.log('Counter component mounted');
    }, [count])

    console.log({count})
    const increment = () => {
        setCount(count + 5);
    }
    const decrement = () => {
        setCount(prev => prev - 5);
        // count--;
    }

    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    const handleClick = () => {
        const randomI = Math.floor(Math.random() * colors.length);
        setRandomIndex(randomI);
       
    }
  return (
    <section className='counter'>
        <div className="container">
            <h2>Counter</h2>
            <div style={{
                backgroundColor: colors[randomIndex],
                height: '100px',
                width: '100px',

            }}
            onClick={handleClick}
            >

            </div>
            <p className='counter__description'>This is a simple counter component.</p>
            <div className='counter__controls'>
                <button className='counter__button' onClick={increment}>Increment</button>
                <button className='counter__button' onClick={decrement}>Decrement</button>
            </div>
            <div className='counter__value'>{count}</div>
        </div>
    </section>
  )
}

export default Counter