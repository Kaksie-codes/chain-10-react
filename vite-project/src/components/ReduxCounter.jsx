// Counter.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../redux/counterSlice';

function ReduxCounter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const handleIncreaseByOne = () => {
    dispatch(increment())
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleIncreaseByOne}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default ReduxCounter;
