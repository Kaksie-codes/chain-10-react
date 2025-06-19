import { useState } from 'react';

const UseStateDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [user, setUser] = useState({ name: '', age: 0, email: '' });

  const addTodo = () => {
    if (todoInput.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoInput, completed: false }]);
      setTodoInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="demo-container">
      <h2 className="demo-title">useState Hook</h2>
      
      <div className="demo-description">
        <p><strong>useState</strong> is the most basic hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.</p>
      </div>

      <div className="code-block">
        {`const [state, setState] = useState(initialValue);`}
      </div>

      <div className="grid">
        {/* Basic Counter */}
        <div className="demo-section">
          <h3>1. Basic Counter</h3>
          <div className="counter">{count}</div>
          <div className="flex">
            <button className="button" onClick={() => setCount(count + 1)}>
              Increment
            </button>
            <button className="button secondary" onClick={() => setCount(count - 1)}>
              Decrement
            </button>
            <button className="button danger" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
          <div className="code-block">
            {`const [count, setCount] = useState(0);
            
<button onClick={() => setCount(count + 1)}>
  Increment
</button>`}
          </div>
        </div>

        {/* String State */}
        <div className="demo-section">
          <h3>2. String State</h3>
          <input
            type="text"
            className="input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && <p>Hello, <strong>{name}</strong>!</p>}
          <div className="code-block">
            {`const [name, setName] = useState('');

<input 
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}
          </div>
        </div>

        {/* Boolean State */}
        <div className="demo-section">
          <h3>3. Boolean State</h3>
          <button className="button" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Hide' : 'Show'} Content
          </button>
          {isVisible && (
            <div className="alert info mt-2">
              <p>🎉 This content is conditionally rendered!</p>
            </div>
          )}
          <div className="code-block">
            {`const [isVisible, setIsVisible] = useState(true);

{isVisible && <div>Content</div>}`}
          </div>
        </div>

        {/* Array State */}
        <div className="demo-section">
          <h3>4. Array State (Todo List)</h3>
          <div className="flex">
            <input
              type="text"
              className="input"
              placeholder="Add a todo"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button className="button" onClick={addTodo}>
              Add
            </button>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            {todos.map(todo => (
              <div key={todo.id} className="card">
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    flex: 1,
                    marginLeft: '0.5rem'
                  }}>
                    {todo.text}
                  </span>
                  <button 
                    className="button danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="code-block">
            {`const [todos, setTodos] = useState([]);

// Add todo
setTodos([...todos, newTodo]);

// Update todo
setTodos(todos.map(todo => 
  todo.id === id ? { ...todo, completed: !todo.completed } : todo
));

// Delete todo
setTodos(todos.filter(todo => todo.id !== id));`}
          </div>
        </div>

        {/* Object State */}
        <div className="demo-section">
          <h3>5. Object State</h3>
          <div>
            <input
              type="text"
              className="input"
              placeholder="Name"
              value={user.name}
              onChange={(e) => updateUser('name', e.target.value)}
            />
            <input
              type="number"
              className="input"
              placeholder="Age"
              value={user.age}
              onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={user.email}
              onChange={(e) => updateUser('email', e.target.value)}
            />
          </div>
          
          {(user.name || user.age || user.email) && (
            <div className="card">
              <h4>User Info:</h4>
              <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
              <p><strong>Age:</strong> {user.age || 'Not provided'}</p>
              <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
            </div>
          )}
          
          <div className="code-block">
            {`const [user, setUser] = useState({ name: '', age: 0, email: '' });

// Update specific property
setUser(prev => ({ ...prev, [field]: value }));`}
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>useState returns an array with current state and setter function</li>
          <li>State updates are asynchronous</li>
          <li>When updating arrays/objects, always create new instances</li>
          <li>Use functional updates when new state depends on previous state</li>
        </ul>
      </div>
    </div>
  );
};

export default UseStateDemo;