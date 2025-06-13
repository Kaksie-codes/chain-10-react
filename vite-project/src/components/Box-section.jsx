import React from 'react'
import Box from './Box'

const BoxSection = ({title, subtitle}) => {
  return (
    <section className='box-section'>
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="content">
          <Box
            name="Judith"
            isMale={false}
            age={30}
          />
          <Box
            isMale={true}
            name="John"
            age={25}
          />
          <Box
            name="Alice"
            isMale={false}
            age={28}
          />
        </div>
      </div>
    </section>
  )
}

export default BoxSection