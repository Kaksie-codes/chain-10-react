
import { useState, useEffect, useRef, useCallback } from 'react';

// Custom Hook 1: useCounter
const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setValue = useCallback((value) => {
    setCount(value);
  }, []);

  return { count, increment, decrement, reset, setValue };
};

// Custom Hook 2: useToggle
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
};

// Custom Hook 3: useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.log(error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

// Custom Hook 4: useFetch
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on URL
        let mockData;
        if (url.includes('users')) {
          mockData = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
          ];
        } else if (url.includes('posts')) {
          mockData = [
            { id: 1, title: 'First Post', body: 'This is the first post content.' },
            { id: 2, title: 'Second Post', body: 'This is the second post content.' }
          ];
        } else {
          mockData = { message: 'Generic API response' };
        }
        
        setData(mockData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

// Custom Hook 5: useDebounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom Hook 6: useInterval
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// Custom Hook 7: useWindowSize
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Component using custom hooks
const CustomHooksDemo = () => {
  // Using custom hooks
  const counter = useCounter(0, 1);
  const toggle = useToggle(false);
  const [name, setName, removeName] = useLocalStorage('demo-name', '');
  const [apiUrl, setApiUrl] = useState('');
  const { data, loading, error } = useFetch(apiUrl);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [time, setTime] = useState(new Date());
  const windowSize = useWindowSize();

  // Use interval to update time
  useInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div className="demo-container">
      <h2 className="demo-title">Custom Hooks</h2>
      
      <div className="demo-description">
        <p><strong>Custom hooks</strong> are JavaScript functions that start with "use" and can call other hooks. They let you extract component logic into reusable functions, making your code more modular and easier to test.</p>
      </div>

      <div className="code-block">
        {`// Custom hook example
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
};

// Using the custom hook
const MyComponent = () => {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
};`}
      </div>

      <div className="grid">
        {/* useCounter */}
        <div className="demo-section">
          <h3>1. useCounter Hook</h3>
          <div className="counter">{counter.count}</div>
          <div className="flex">
            <button className="button" onClick={counter.increment}>
              +1
            </button>
            <button className="button secondary" onClick={counter.decrement}>
              -1
            </button>
            <button className="button danger" onClick={counter.reset}>
              Reset
            </button>
            <button className="button" onClick={() => counter.setValue(10)}>
              Set to 10
            </button>
          </div>
          
          <div className="code-block">
            {`const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);
  
  return { count, increment, decrement, reset };
};`}
          </div>
        </div>

        {/* useToggle */}
        <div className="demo-section">
          <h3>2. useToggle Hook</h3>
          <p>Toggle state: <strong>{toggle.value ? 'ON' : 'OFF'}</strong></p>
          {toggle.value && (
            <div className="alert success">
              🎉 Toggle is ON!
            </div>
          )}
          <div className="flex">
            <button className="button" onClick={toggle.toggle}>
              Toggle
            </button>
            <button className="button success" onClick={toggle.setTrue}>
              Set True
            </button>
            <button className="button secondary" onClick={toggle.setFalse}>
              Set False
            </button>
          </div>
          
          <div className="code-block">
            {`const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);
  
  return { value, toggle, setTrue, setFalse };
};`}
          </div>
        </div>

        {/* useLocalStorage */}
        <div className="demo-section">
          <h3>3. useLocalStorage Hook</h3>
          <input
            type="text"
            className="input"
            placeholder="Enter your name (saved to localStorage)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && <p>Hello, <strong>{name}</strong>!</p>}
          <button className="button danger" onClick={removeName}>
            Clear Name
          </button>
          <p><small>Refresh the page - your name will persist!</small></p>
          
          <div className="code-block">
            {`const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
};`}
          </div>
        </div>

        {/* useFetch */}
        <div className="demo-section">
          <h3>4. useFetch Hook</h3>
          <div className="flex">
            <button 
              className="button" 
              onClick={() => setApiUrl('https://api.example.com/users')}
            >
              Fetch Users
            </button>
            <button 
              className="button secondary" 
              onClick={() => setApiUrl('https://api.example.com/posts')}
            >
              Fetch Posts
            </button>
            <button 
              className="button danger" 
              onClick={() => setApiUrl('')}
            >
              Clear
            </button>
          </div>
          
          {loading && <p>Loading...</p>}
          {error && <div className="alert error">Error: {error}</div>}
          {data && (
            <div className="card">
              <h4>API Response:</h4>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
          
          <div className="code-block">
            {`const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (url) fetchData();
  }, [url]);
  
  return { data, loading, error };
};`}
          </div>
        </div>

        {/* useDebounce */}
        <div className="demo-section">
          <h3>5. useDebounce Hook</h3>
          <input
            type="text"
            className="input"
            placeholder="Type to see debounce effect..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="card">
            <p><strong>Immediate value:</strong> {searchTerm}</p>
            <p><strong>Debounced value (500ms delay):</strong> {debouncedSearchTerm}</p>
          </div>
          <p><small>The debounced value updates 500ms after you stop typing.</small></p>
          
          <div className="code-block">
            {`const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};`}
          </div>
        </div>

        {/* useInterval */}
        <div className="demo-section">
          <h3>6. useInterval Hook</h3>
          <p>Current time: <strong>{time.toLocaleTimeString()}</strong></p>
          <p><small>Updates every second using useInterval</small></p>
          
          <div className="code-block">
            {`const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    const tick = () => savedCallback.current();
    
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};`}
          </div>
        </div>

        {/* useWindowSize */}
        <div className="demo-section">
          <h3>7. useWindowSize Hook</h3>
          <div className="card">
            <p><strong>Window Width:</strong> {windowSize.width}px</p>
            <p><strong>Window Height:</strong> {windowSize.height}px</p>
            <p><small>Resize your window to see the values change!</small></p>
          </div>
          
          <div className="code-block">
            {`const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
};`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Custom Hooks Benefits</h3>
        <div className="grid">
          <div className="card">
            <h4>✅ Benefits</h4>
            <ul>
              <li><strong>Reusability:</strong> Use same logic across components</li>
              <li><strong>Separation of Concerns:</strong> Extract complex logic</li>
              <li><strong>Testability:</strong> Test hooks independently</li>
              <li><strong>Composition:</strong> Combine multiple hooks</li>
              <li><strong>Abstraction:</strong> Hide implementation details</li>
            </ul>
          </div>
          
          <div className="card">
            <h4>📝 Best Practices</h4>
            <ul>
              <li>Always start with "use" prefix</li>
              <li>Return objects for multiple values</li>
              <li>Use useCallback for stable functions</li>
              <li>Handle cleanup in useEffect</li>
              <li>Document your custom hooks</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>Custom hooks must start with "use" prefix</li>
          <li>They can call other hooks (useState, useEffect, etc.)</li>
          <li>Perfect for extracting and sharing component logic</li>
          <li>Each hook call has its own isolated state</li>
          <li>Great for API calls, local storage, timers, and more</li>
          <li>Make components cleaner and more focused</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomHooksDemo;