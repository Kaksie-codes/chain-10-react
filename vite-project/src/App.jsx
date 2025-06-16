import { useState } from 'react'
import './App.css'
import BoxSection from './components/Box-section'
import Counter from './components/Counter'
import { Header } from './components/Header'
import Typist from './components/typist'
import User from './components/User'

function App() {
  const [title, setTitle] = useState('Typist');
    const handleTitleChange = (e) => {
        console.log({title: e.target.value})
        setTitle(e.target.value)
    }

  return (
   <div>
    <Header title={title}/>
    <Counter/>
    <Typist 
      name={title} 
      handleChange={handleTitleChange}
    />
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

export default App
