import { useReducer, useState } from 'react';

// Reducer for counter
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Reducer for todo list
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }
};

// Complex form reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: ''
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'RESET_FORM':
      return {
        values: { name: '', email: '', message: '' },
        errors: {},
        loading: false
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        loading: false,
        submitted: true
      };
    default:
      return state;
  }
};

const UseReducerDemo = () => {
  // Simple counter with useReducer
  const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 });

  // Todo list with useReducer
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  // Complex form with useReducer
  const [formState, formDispatch] = useReducer(formReducer, {
    values: { name: '', email: '', message: '' },
    errors: {},
    loading: false,
    submitted: false
  });

  const [todoInput, setTodoInput] = useState('');

  const addTodo = () => {
    if (todoInput.trim()) {
      todoDispatch({ type: 'ADD_TODO', payload: todoInput });
      setTodoInput('');
    }
  };

  const filteredTodos = todoState.todos.filter(todo => {
    if (todoState.filter === 'completed') return todo.completed;
    if (todoState.filter === 'active') return !todo.completed;
    return true;
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const { name, email, message } = formState.values;
    let hasErrors = false;

    if (!name.trim()) {
      formDispatch({ type: 'SET_ERROR', field: 'name', error: 'Name is required' });
      hasErrors = true;
    }
    if (!email.trim()) {
      formDispatch({ type: 'SET_ERROR', field: 'email', error: 'Email is required' });
      hasErrors = true;
    }
    if (!message.trim()) {
      formDispatch({ type: 'SET_ERROR', field: 'message', error: 'Message is required' });
      hasErrors = true;
    }

    if (hasErrors) return;

    // Simulate form submission
    formDispatch({ type: 'SET_LOADING', payload: true });
    
    setTimeout(() => {
      formDispatch({ type: 'SUBMIT_SUCCESS' });
      setTimeout(() => {
        formDispatch({ type: 'RESET_FORM' });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="demo-container">
      <h2 className="demo-title">useReducer Hook</h2>
      
      <div className="demo-description">
        <p><strong>useReducer</strong> is an alternative to useState for managing complex state logic. It's especially useful when you have multiple sub-values or when the next state depends on the previous one.</p>
      </div>

      <div className="code-block">
        {`const [state, dispatch] = useReducer(reducer, initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return newState;
    default:
      return state;
  }
};`}
      </div>

      <div className="grid">
        {/* Simple Counter */}
        <div className="demo-section">
          <h3>1. Simple Counter</h3>
          <div className="counter">{counterState.count}</div>
          <div className="flex">
            <button 
              className="button" 
              onClick={() => counterDispatch({ type: 'INCREMENT' })}
            >
              +1
            </button>
            <button 
              className="button secondary" 
              onClick={() => counterDispatch({ type: 'DECREMENT' })}
            >
              -1
            </button>
            <button 
              className="button danger" 
              onClick={() => counterDispatch({ type: 'RESET' })}
            >
              Reset
            </button>
            <button 
              className="button" 
              onClick={() => counterDispatch({ type: 'SET', payload: 10 })}
            >
              Set to 10
            </button>
          </div>
          <div className="code-block">
            {`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(counterReducer, { count: 0 });`}
          </div>
        </div>

        {/* Todo List */}
        <div className="demo-section">
          <h3>2. Todo List with Filters</h3>
          
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

          <div className="flex" style={{ marginTop: '1rem' }}>
            <button 
              className={`button ${todoState.filter === 'all' ? '' : 'secondary'}`}
              onClick={() => todoDispatch({ type: 'SET_FILTER', payload: 'all' })}
            >
              All ({todoState.todos.length})
            </button>
            <button 
              className={`button ${todoState.filter === 'active' ? '' : 'secondary'}`}
              onClick={() => todoDispatch({ type: 'SET_FILTER', payload: 'active' })}
            >
              Active ({todoState.todos.filter(t => !t.completed).length})
            </button>
            <button 
              className={`button ${todoState.filter === 'completed' ? '' : 'secondary'}`}
              onClick={() => todoDispatch({ type: 'SET_FILTER', payload: 'completed' })}
            >
              Completed ({todoState.todos.filter(t => t.completed).length})
            </button>
          </div>

          {todoState.todos.some(t => t.completed) && (
            <button 
              className="button danger"
              onClick={() => todoDispatch({ type: 'CLEAR_COMPLETED' })}
              style={{ marginTop: '1rem' }}
            >
              Clear Completed
            </button>
          )}

          <div style={{ marginTop: '1rem' }}>
            {filteredTodos.map(todo => (
              <div key={todo.id} className="card">
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => todoDispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
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
                    onClick={() => todoDispatch({ type: 'DELETE_TODO', payload: todo.id })}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="code-block">
            {`const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    default:
      return state;
  }
};`}
          </div>
        </div>

        {/* Complex Form */}
        <div className="demo-section">
          <h3>3. Complex Form State</h3>
          
          {formState.submitted ? (
            <div className="alert success">
              <p>✅ Form submitted successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div>
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  value={formState.values.name}
                  onChange={(e) => formDispatch({ 
                    type: 'SET_FIELD', 
                    field: 'name', 
                    value: e.target.value 
                  })}
                />
                {formState.errors.name && (
                  <div className="alert error">{formState.errors.name}</div>
                )}
              </div>

              <div>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={formState.values.email}
                  onChange={(e) => formDispatch({ 
                    type: 'SET_FIELD', 
                    field: 'email', 
                    value: e.target.value 
                  })}
                />
                {formState.errors.email && (
                  <div className="alert error">{formState.errors.email}</div>
                )}
              </div>

              <div>
                <textarea
                  className="input"
                  placeholder="Message"
                  rows="4"
                  value={formState.values.message}
                  onChange={(e) => formDispatch({ 
                    type: 'SET_FIELD', 
                    field: 'message', 
                    value: e.target.value 
                  })}
                />
                {formState.errors.message && (
                  <div className="alert error">{formState.errors.message}</div>
                )}
              </div>

              <button 
                type="submit" 
                className="button"
                disabled={formState.loading}
              >
                {formState.loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}

          <div className="code-block">
            {
                `const formReducer = (state, action) => {
                    switch (action.type) {
                        case 'SET_FIELD':
                        return {
                            ...state,
                            values: { ...state.values, [action.field]: action.value },
                            errors: { ...state.errors, [action.field]: '' }
                        };
                        case 'SET_ERROR':
                        return {
                            ...state,
                            errors: { ...state.errors, [action.field]: action.error }
                        };
                        default:
                        return state;
                    }
                };`
            }
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>useReducer vs useState</h3>
        <div className="grid">
          <div className="card">
            <h4>Use useState when:</h4>
            <ul>
              <li>State is simple (primitive values)</li>
              <li>State updates are straightforward</li>
              <li>Few state variables</li>
              <li>No complex state logic</li>
            </ul>
          </div>
          <div className="card">
            <h4>Use useReducer when:</h4>
            <ul>
              <li>Complex state objects</li>
              <li>Multiple related state variables</li>
              <li>Next state depends on previous state</li>
              <li>Complex state logic</li>
              <li>Want to optimize performance (stable dispatch)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>useReducer is great for complex state logic</li>
          <li>Reducer functions must be pure (no side effects)</li>
          <li>Actions should be descriptive objects with type and payload</li>
          <li>dispatch function is stable and won't change between renders</li>
          <li>Great for state machines and complex workflows</li>
        </ul>
      </div>
    </div>
  );
};

export default UseReducerDemo;