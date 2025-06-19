import { useState, useRef, useEffect } from 'react';

const UseRefDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Refs for DOM elements
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Refs for storing values
  const renderCountRef = useRef(0);
  const intervalRef = useRef(null);
  const previousNameRef = useRef('');

  // Update render count on every render
  renderCountRef.current += 1;

  // Store previous value
  useEffect(() => {
    previousNameRef.current = name;
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const selectText = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages(prev => [...prev, `File selected: ${file.name}`]);
    }
  };

  const addMessage = () => {
    const message = `Message ${messages.length + 1} - ${new Date().toLocaleTimeString()}`;
    setMessages(prev => [...prev, message]);
  };

  const startTimer = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCount(0);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="demo-container">
      <h2 className="demo-title">useRef Hook</h2>
      
      <div className="demo-description">
        <p><strong>useRef</strong> returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component.</p>
      </div>

      <div className="code-block">
        {`const refObject = useRef(initialValue);
        
// Access the current value
refObject.current = newValue;

// DOM element ref
<input ref={inputRef} />`}
      </div>

      <div className="grid">
        {/* DOM References */}
        <div className="demo-section">
          <h3>1. DOM Element References</h3>
          
          <input
            ref={inputRef}
            type="text"
            className="input"
            placeholder="This input can be controlled via ref"
          />
          
          <div className="flex">
            <button className="button" onClick={focusInput}>
              Focus Input
            </button>
            <button className="button secondary" onClick={clearInput}>
              Clear Input
            </button>
            <button className="button" onClick={selectText}>
              Select Text
            </button>
          </div>

          <div className="code-block">
            {`const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current?.focus();
};

const clearInput = () => {
  inputRef.current.value = '';
};

<input ref={inputRef} />`}
          </div>
        </div>

        {/* File Input */}
        <div className="demo-section">
          <h3>2. Hidden File Input</h3>
          
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          
          <button className="button" onClick={triggerFileUpload}>
            📁 Select File
          </button>

          <div className="code-block">
            {`const fileInputRef = useRef(null);

const triggerFileUpload = () => {
  fileInputRef.current?.click();
};

<input 
  ref={fileInputRef} 
  type="file" 
  style={{ display: 'none' }} 
/>`}
          </div>
        </div>

        {/* Storing Values */}
        <div className="demo-section">
          <h3>3. Storing Mutable Values</h3>
          
          <div className="card">
            <p><strong>Render Count:</strong> {renderCountRef.current}</p>
            <p><strong>Current Name:</strong> {name}</p>
            <p><strong>Previous Name:</strong> {previousNameRef.current}</p>
            
            <input
              type="text"
              className="input"
              placeholder="Type your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <button className="button" onClick={() => setCount(count + 1)}>
              Trigger Re-render
            </button>
          </div>

          <div className="code-block">
            {`const renderCountRef = useRef(0);
const previousNameRef = useRef('');

// Increment on every render
renderCountRef.current += 1;

// Store previous value
useEffect(() => {
  previousNameRef.current = name;
});`}
          </div>
        </div>

        {/* Timer with Cleanup */}
        <div className="demo-section">
          <h3>4. Timer with Interval Ref</h3>
          
          <div className="counter">{count}</div>
          
          <div className="flex">
            <button className="button success" onClick={startTimer}>
              Start Timer
            </button>
            <button className="button danger" onClick={stopTimer}>
              Stop Timer
            </button>
            <button className="button secondary" onClick={resetTimer}>
              Reset Timer
            </button>
          </div>

          <div className="code-block">
            {`const intervalRef = useRef(null);

const startTimer = () => {
  intervalRef.current = setInterval(() => {
    setCount(prevCount => prevCount + 1);
  }, 1000);
};

const stopTimer = () => {
  clearInterval(intervalRef.current);
  intervalRef.current = null;
};`}
          </div>
        </div>

        {/* Auto-scroll Messages */}
        <div className="demo-section">
          <h3>5. Auto-scroll Messages</h3>
          
          <button className="button" onClick={addMessage}>
            Add Message
          </button>
          
          <div style={{ 
            height: '200px', 
            overflowY: 'auto', 
            border: '2px solid #e1e5e9', 
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            {messages.map((message, index) => (
              <div key={index} className="card" style={{ margin: '0.5rem 0' }}>
                {message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="code-block">
            {`const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ 
    behavior: 'smooth' 
  });
}, [messages]);

<div ref={messagesEndRef} />`}
          </div>
        </div>

        {/* Video Control */}
        <div className="demo-section">
          <h3>6. Video Control</h3>
          
          <video
            ref={videoRef}
            width="100%"
            height="200"
            controls={false}
            style={{ backgroundColor: '#000', borderRadius: '6px' }}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <button className="button" onClick={toggleVideo}>
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>

          <div className="code-block">
            {`const videoRef = useRef(null);

const toggleVideo = () => {
  if (videoRef.current) {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }
};`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>useRef vs useState</h3>
        <div className="grid">
          <div className="card">
            <h4>useState</h4>
            <ul>
              <li>Triggers re-render when value changes</li>
              <li>For component state that affects UI</li>
              <li>Value is immutable between renders</li>
              <li>Has state setter function</li>
            </ul>
            <div className="code-block">
              {`const [count, setCount] = useState(0);
setCount(count + 1); // Triggers re-render`}
            </div>
          </div>
          
          <div className="card">
            <h4>useRef</h4>
            <ul>
              <li>Does NOT trigger re-render when changed</li>
              <li>For mutable values that don't affect UI</li>
              <li>Value persists between renders</li>
              <li>Direct mutation of .current property</li>
            </ul>
            <div className="code-block">
              {`const countRef = useRef(0);
countRef.current += 1; // No re-render`}
            </div>
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>useRef creates a mutable object that persists across renders</li>
          <li>Changing .current doesn't trigger re-renders</li>
          <li>Perfect for DOM element references</li>
          <li>Great for storing mutable values (timers, counters, etc.)</li>
          <li>Use for accessing DOM methods (focus, scroll, play, etc.)</li>
          <li>Don't forget to clean up intervals and timers!</li>
        </ul>
      </div>
    </div>
  );
};

export default UseRefDemo;