// import React, { useEffect, useState } from 'react'

const Typist = ({handleChange, name}) => {
    // const [title, setTitle] = useState('Typist');
    // const handleTitleChange = (e) => {
    //     console.log({title: e.target.value})
    //     setTitle(e.target.value)
    // }

    // useEffect(() => {
    //     console.log('use effect running....');
    //     if(title.length === 0){
    //         // alert('Ku type aba!')
    //         setTitle('Sugar')
    //     }
    // }, [title])

  return (
    <div>
        <div className='container'>
            <h1>{name}</h1>
            <div>
                <label htmlFor="title">Title</label>
                <input 
                    type="text"  
                    placeholder='Type something' 
                    id='title'
                    value={name}
                    // onChange={(e) => setTitle(e.target.value)}
                    onChange={handleChange}
                />
            </div>
        </div>
    </div>
  )
}

export default Typist