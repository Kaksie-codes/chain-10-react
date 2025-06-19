import { useState, useCallback, useMemo, memo } from 'react';

// Child component without memo
const RegularButton = ({ onClick, children }) => {
  console.log(`🔄 RegularButton rendered: ${children}`);
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

// Child component with memo
const MemoizedButton = memo(({ onClick, children }) => {
  console.log(`✨ MemoizedButton rendered: ${children}`);
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
});

// List item component
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log(`📝 TodoItem rendered: ${todo.text}`);
  return (
    <div className="card">
      <div className="flex">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none',
          flex: 1,
          marginLeft: '0.5rem'
        }}>
          {todo.text}
        </span>
        <button className="button danger" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
});

// Search component
const SearchComponent = memo(({ onSearch, searchTerm }) => {
  console.log('🔍 SearchComponent rendered');
  return (
    <input
      type="text"
      className="input"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
});

const UseCallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');

  // WITHOUT useCallback - function recreated on every render
  const handleClickWithoutCallback = () => {
    console.log('Button clicked without callback');
  };

  // WITH useCallback - function memoized
  const handleClickWithCallback = useCallback(() => {
    console.log('Button clicked with callback');
  }, []); // Empty dependency array means it never changes

  // useCallback with dependencies
  const handleCountIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // No dependencies needed because we use functional update

  const handleCountDecrement = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []);

  // Todo operations with useCallback
  const addTodo = useCallback(() => {
    if (todoInput.trim()) {
      setTodos(prevTodos => [...prevTodos, {
        id: Date.now(),
        text: todoInput,
        completed: false
      }]);
      setTodoInput('');
    }
  }, [todoInput]);

  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Search with useCallback
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Filtered todos with useMemo (depends on memoized search function)
  const filteredTodos = useMemo(() => {
    console.log('🔍 Filtering todos...');
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  // Theme toggle with useCallback
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  // Expensive operation that depends on count
  const expensiveCalculation = useCallback((multiplier) => {
    console.log('💰 Expensive calculation running...');
    return count * multiplier * 1000;
  }, [count]);

  return (
    <div className="demo-container">
      <h2 className="demo-title">useCallback Hook</h2>
      
      <div className="demo-description">
        <p><strong>useCallback</strong> returns a memoized callback function. It's useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.</p>
      </div>

      <div className="code-block">
        {`const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b] // Dependencies
);`}
      </div>

      <div className="demo-section">
        <h3>1. Basic Comparison - With & Without useCallback</h3>
        <p>Count: {count}</p>
        <button className="button" onClick={() => setCount(count + 1)}>
          Increment Count (causes re-render)
        </button>
        
        <div className="grid">
          <div className="card">
            <h4>❌ Without useCallback</h4>
            <p>Function recreated on every render</p>
            <RegularButton onClick={handleClickWithoutCallback}>
              Regular Button
            </RegularButton>
            <MemoizedButton onClick={handleClickWithoutCallback}>
              Memoized Button (still re-renders!)
            </MemoizedButton>
          </div>
          
          <div className="card">
            <h4>✅ With useCallback</h4>
            <p>Function memoized, prevents unnecessary re-renders</p>
            <RegularButton onClick={handleClickWithCallback}>
              Regular Button
            </RegularButton>
            <MemoizedButton onClick={handleClickWithCallback}>
              Memoized Button (optimized!)
            </MemoizedButton>
          </div>
        </div>

        <div className="code-block">
          {`// Without useCallback - recreated every render
const handleClick = () => {
  console.log('Clicked');
};

// With useCallback - memoized
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []); // Empty deps = never changes`}
        </div>
      </div>

      <div className="demo-section">
        <h3>2. Counter with Memoized Handlers</h3>
        <div className="counter">{count}</div>
        <div className="flex">
          <MemoizedButton onClick={handleCountIncrement}>
            Increment
          </MemoizedButton>
          <MemoizedButton onClick={handleCountDecrement}>
            Decrement
          </MemoizedButton>
        </div>
        <p>Check console - buttons only re-render when their onClick prop changes</p>
        
        <div className="code-block">
          {`const handleIncrement = useCallback(() => {
  setCount(prevCount => prevCount + 1);
}, []); // No dependencies - uses functional update`}
        </div>
      </div>

      <div className="demo-section">
        <h3>3. Todo List with Optimized Callbacks</h3>
        
        <div className="flex">
          <input
            type="text"
            className="input"
            placeholder="Add a todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <MemoizedButton onClick={addTodo}>
            Add Todo
          </MemoizedButton>
        </div>

        <SearchComponent onSearch={handleSearch} searchTerm={searchTerm} />

        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}

        <div className="code-block">
          {`const toggleTodo = useCallback((id) => {
  setTodos(prevTodos => 
    prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}, []); // No dependencies - uses functional update

// Memoized component only re-renders if props change
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <input onChange={() => onToggle(todo.id)} />
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});`}
        </div>
      </div>

      <div className="demo-section">
        <h3>4. useCallback with Dependencies</h3>
        <p>Current theme: <strong>{theme}</strong></p>
        <p>Expensive calculation result: <strong>{expensiveCalculation(5)}</strong></p>
        
        <div className="flex">
          <MemoizedButton onClick={toggleTheme}>
            Toggle Theme
          </MemoizedButton>
          <MemoizedButton onClick={() => console.log(expensiveCalculation(10))}>
            Run Expensive Calculation
          </MemoizedButton>
        </div>

        <div className="code-block">
          {`const expensiveCalculation = useCallback((multiplier) => {
  return count * multiplier * 1000;
}, [count]); // Recreated only when count changes

const toggleTheme = useCallback(() => {
  setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
}, []); // Never recreated`}
        </div>
      </div>

      <div className="demo-section">
        <h3>5. useCallback vs useMemo</h3>
        <div className="grid">
          <div className="card">
            <h4>useCallback</h4>
            <p>Memoizes <strong>functions</strong></p>
            <div className="code-block">
              {`const memoizedFn = useCallback(
  () => doSomething(),
  [dependency]
);`}
            </div>
            <ul>
              <li>Returns a memoized function</li>
              <li>Prevents function recreation</li>
              <li>Used with React.memo for optimization</li>
            </ul>
          </div>
          
          <div className="card">
            <h4>useMemo</h4>
            <p>Memoizes <strong>values</strong></p>
            <div className="code-block">
              {`const memoizedValue = useMemo(
  () => computeExpensiveValue(),
  [dependency]
);`}
            </div>
            <ul>
              <li>Returns a memoized value</li>
              <li>Prevents expensive calculations</li>
              <li>Used for computed values</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>useCallback memoizes functions, not their execution</li>
          <li>Most useful with React.memo() for preventing unnecessary re-renders</li>
          <li>Dependencies array works like useEffect and useMemo</li>
          <li>Don't overuse - only optimize when necessary</li>
          <li>Perfect for event handlers passed to child components</li>
          <li>Use functional updates to avoid dependencies when possible</li>
        </ul>
      </div>
    </div>
  );
};

export default UseCallbackDemo;