import React from 'react';
import { useToggle } from './hooks/useToggle';


const ToggleExample = () => {
  const { isToggled, toggle, setTrue, setFalse } = useToggle();   

  return (
    <div className="p-4">
      <p>Status: {isToggled ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Turn ON</button>
      <button onClick={setFalse}>Turn OFF</button>
    </div>
  );
};

export default ToggleExample;
