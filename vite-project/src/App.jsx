import './App.css'
import Animal from './components/Animal'
import Counter from './components/Counter'
import { Header } from './components/Header'
import Hooks from './components/hooks/Hooks'
import Other from './components/Other'
import Profile from './components/profilefeature/Profile'
import ThemeToggler from './components/ThemeToggler'
import TitleChanger from './components/TitleChanger'
import ToggleExample from './components/ToggleExample'

function App() {
 

  return (
   <div>
    <Header/> 
    <ToggleExample/> 
    <ThemeToggler/>
    <TitleChanger/>
    {/* <Animal/> */}
    {/* <Other/> */}
    {/* <Hooks/>   */}
    {/* <Profile/> */}
   </div>
  )
}

export default App
