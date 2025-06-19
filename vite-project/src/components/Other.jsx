import React, { useState } from 'react'
import { Header } from './Header';
import Typist from './typist';
import Counter from './Counter';
import Display from './Display';
import Calculator from './Calculator';

const Other = () => {
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

    // const [title, setTitle] = useState('Typist');
    // const handleTitleChange = (e) => {
    //     console.log({title: e.target.value})
    //     setTitle(e.target.value)
    // }
  return (
    <div>
      <Display
        price={unitPrice}
        qty={quantity}
        total={totalPrice}
      />
      <Calculator
        unitPrice={unitPrice}
        setUnitPrice={setUnitPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
         {/* <Header title={title}/>
         <Counter/>
          <Typist
            name={title} 
            handleChange={handleTitleChange}
          /> */}
        
   
    {/* <User name={'Mfoniso'} age={35} ocupation={'trader'}/>
    <User 
      name={'Uduak'} 
      age={20} 
      ocupation='Crypto Ambassador' 
      profilePicture='https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=200'/>
    <User name={'Judith'} age={30} ocupation='Software Engineer'/> */}
    {/* <BoxSection
      title="Box Section" 
      subtitle="This is a subtitle for the box section" 
    />  
    <BoxSection
      title="Another Box Section" 
      subtitle="This is another subtitle for the box section"
    />   */}
    </div>
  )
}

export default Other