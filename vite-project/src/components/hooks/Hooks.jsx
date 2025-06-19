import React, { useState } from 'react'
import { ThemeProvider } from '../../context/ThemeContext'
import UseStateDemo from './UseStateDemo';
import UseEffectDemo from './UseEffectDemo';
import UseContextDemo from './useContextDemo';
import UseReducerDemo from './UseReducerDemo';
import UseMemoDemo from './UseMemoDemo';
import UseCallbackDemo from './UseCallbackDemo';
import UseRefDemo from './UseRefDemo';
import CustomHooksDemo from './CustomHooksDemo';
import PropDrillingDemo from './PropDrillingDemo';
import ModalDemo from './ModalDemo';
import Navigation from './Navigation';

const Hooks = () => {
    const [activeSection, setActiveSection] = useState('useState');

    const sections = {
        useState: <UseStateDemo />,
        useEffect: <UseEffectDemo />,
        useContext: <UseContextDemo />,
        useReducer: <UseReducerDemo />,
        useMemo: <UseMemoDemo />,
        useCallback: <UseCallbackDemo />,
        useRef: <UseRefDemo />,
        customHooks: <CustomHooksDemo />,
        propDrilling: <PropDrillingDemo />,
        modals: <ModalDemo />
    };

  return (
    <ThemeProvider>
        <div className="app">
        <header className="app-header">
          <h1>🎣 React Hooks Interactive Lesson</h1>
          <p>Learn React Hooks with hands-on examples</p>
        </header>
        
        <Navigation
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        <main className="main-content">
          {sections[activeSection]}
        </main>
        
        <footer className="app-footer">
          <p>Built with React hooks for educational purposes</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Hooks;