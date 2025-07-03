import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [isToggled, setIsToggled] = useState(initialValue);

//   const toggle = () => setIsToggled(prev => !prev);
  const toggle = () => setIsToggled(!isToggled);
  const setTrue = () => setIsToggled(true);
  const setFalse = () => setIsToggled(false);

//   return { isToggled, toggle, setTrue, setFalse };
  return {
    isToggled: isToggled,
    toggle: toggle,
    setTrue: setTrue,
    setFalse: setFalse
  }
}


// const addNum = (num1, num2) => {
//     return num1 + num2
// }

// let result = addNum(2, 3);