import { useState, useEffect } from 'react';

const UseEffectDemo = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [time, setTime] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Effect 1: Runs on every render
  useEffect(() => {
    console.log('This runs on every render');
    document.title = `Count: ${count}`;
  });

  // Effect 2: Runs only once (componentDidMount equivalent)
  useEffect(() => {
    console.log('This runs only once when component mounts');
    fetchUsers();
  }, []);

  // Effect 3: Runs when count changes
  useEffect(() => {
    console.log('Count changed to:', count);
    if (count > 5) {
      console.log('Count is greater than 5!');
    }
  }, [count]);

  // Effect 4: Window resize listener with cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect 5: Timer with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Effect 6: Fetch posts when user is selected
  useEffect(() => {
    if (selectedUserId) {
      fetchUserPosts(selectedUserId);
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockPosts = [
        { id: 1, title: `Post 1 by User ${userId}`, body: 'This is the first post content...' },
        { id: 2, title: `Post 2 by User ${userId}`, body: 'This is the second post content...' },
        { id: 3, title: `Post 3 by User ${userId}`, body: 'This is the third post content...' }
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="demo-container">
      <h2 className="demo-title">useEffect Hook</h2>
      
      <div className="demo-description">
        <p><strong>useEffect</strong> lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.</p>
      </div>

      <div className="code-block">
        {`useEffect(() => {
  // Side effect logic
  
  return () => {
    // Cleanup logic (optional)
  };
}, [dependencies]); // Dependency array`}
      </div>

      <div className="grid">
        {/* Basic Effect */}
        <div className="demo-section">
          <h3>1. Effect on Every Render</h3>
          <p>Current count: <span className="counter">{count}</span></p>
          <p>Check the document title and console!</p>
          <button className="button" onClick={() => setCount(count + 1)}>
            Increment Count
          </button>
          <div className="code-block">
            {`useEffect(() => {
  document.title = \`Count: \${count}\`;
}); // No dependency array = runs on every render`}
          </div>
        </div>

        {/* Effect with Empty Dependencies */}
        <div className="demo-section">
          <h3>2. Effect on Mount Only</h3>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div>
              <p>Users loaded: {users.length}</p>
              {users.map(user => (
                <div key={user.id} className="card">
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          )}
          <div className="code-block">
            {`useEffect(() => {
  fetchUsers();
}, []); // Empty array = runs only once on mount`}
          </div>
        </div>

        {/* Effect with Dependencies */}
        <div className="demo-section">
          <h3>3. Effect with Dependencies</h3>
          <p>Count: {count}</p>
          <p>Check console when count changes!</p>
          <button className="button" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <div className="code-block">
            {`useEffect(() => {
  console.log('Count changed to:', count);
}, [count]); // Runs when count changes`}
          </div>
        </div>

        {/* Effect with Cleanup */}
        <div className="demo-section">
          <h3>4. Effect with Cleanup</h3>
          <p>Window width: <strong>{windowWidth}px</strong></p>
          <p>Try resizing your window!</p>
          <div className="code-block">
            {`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`}
          </div>
        </div>

        {/* Timer Effect */}
        <div className="demo-section">
          <h3>5. Timer Effect</h3>
          <p>Current time: <strong>{time.toLocaleTimeString()}</strong></p>
          <div className="code-block">
            {`useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);
  
  return () => clearInterval(timer);
}, []);`}
          </div>
        </div>

        {/* Conditional Effect */}
        <div className="demo-section">
          <h3>6. Conditional Effects</h3>
          <div>
            <p>Select a user to load their posts:</p>
            <select 
              className="input"
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">Select a user...</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          
          {selectedUserId && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Posts by User {selectedUserId}:</h4>
              {posts.map(post => (
                <div key={post.id} className="card">
                  <h5>{post.title}</h5>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="code-block">
            {`useEffect(() => {
  if (selectedUserId) {
    fetchUserPosts(selectedUserId);
  }
}, [selectedUserId]);`}
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li><strong>No dependencies:</strong> Runs after every render</li>
          <li><strong>Empty array []:</strong> Runs only once after initial render</li>
          <li><strong>With dependencies [dep1, dep2]:</strong> Runs when any dependency changes</li>
          <li><strong>Cleanup function:</strong> Returned function runs before next effect or component unmount</li>
          <li>Always clean up subscriptions, timers, and event listeners</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectDemo;