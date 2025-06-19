import { useState, createContext, useContext } from 'react';

// Context to avoid prop drilling
const AppContext = createContext();

// Grandparent Component
const Grandparent = () => {
  const [user, setUser] = useState({ name: 'John Doe', role: 'admin' });
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to the app!', read: false },
    { id: 2, message: 'You have 3 new messages', read: false },
    { id: 3, message: 'System maintenance tonight', read: true }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="demo-container">
      <h2 className="demo-title">Prop Drilling Demo</h2>

      <div className="demo-description">
        <p><strong>Prop drilling</strong> occurs when you need to pass data through several levels of components to reach a deeply nested component. This creates maintenance issues and makes components tightly coupled.</p>
      </div>

      <div className="grid">
        <div className="demo-section">
          <h3>❌ With Prop Drilling</h3>
          <div className="card">
            <h4>Grandparent Component</h4>
            <p>Has to pass ALL props down to children</p>
            <PropDrillingParent 
              user={user}
              theme={theme}
              notifications={notifications}
              markAsRead={markAsRead}
              toggleTheme={toggleTheme}
            />
          </div>

          <div className="code-block">
            {`// Grandparent passes everything down
<Parent 
  user={user}
  theme={theme}
  notifications={notifications}
  markAsRead={markAsRead}
  toggleTheme={toggleTheme}
/>`}
          </div>
        </div>

        <div className="demo-section">
          <h3>✅ With Context (No Prop Drilling)</h3>
          <AppContext.Provider value={{ 
            user, 
            theme, 
            notifications, 
            markAsRead, 
            toggleTheme 
          }}>
            <div className="card">
              <h4>Grandparent with Context</h4>
              <p>Provides context, children access directly</p>
              <ContextParent />
            </div>
          </AppContext.Provider>

          <div className="code-block">
            {`// Clean context provider
<AppContext.Provider value={{ user, theme, notifications, markAsRead, toggleTheme }}>
  <Parent />
</AppContext.Provider>`}
          </div>
        </div>
      </div>
    </div>
  );
};

const PropDrillingParent = ({ user, theme, notifications, markAsRead, toggleTheme }) => (
  <div className="card" style={{ marginLeft: '1rem' }}>
    <h5>Parent Component (Prop Drilling)</h5>
    <p>Receives props just to pass them down...</p>
    <PropDrillingChild 
      user={user}
      theme={theme}
      notifications={notifications}
      markAsRead={markAsRead}
      toggleTheme={toggleTheme}
    />
  </div>
);

const PropDrillingChild = ({ user, theme, notifications, markAsRead, toggleTheme }) => (
  <div className="card" style={{ marginLeft: '1rem' }}>
    <h5>Child Component (Prop Drilling)</h5>
    <p>Also just passes props down...</p>
    <PropDrillingGrandchild 
      user={user}
      theme={theme}
      notifications={notifications}
      markAsRead={markAsRead}
      toggleTheme={toggleTheme}
    />
  </div>
);

const PropDrillingGrandchild = ({ user, theme, notifications, markAsRead, toggleTheme }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="card" style={{ marginLeft: '1rem' }}>
      <h5>Grandchild Component (Finally uses props!)</h5>
      <div>
        <p><strong>User:</strong> {user.name} ({user.role})</p>
        <p><strong>Theme:</strong> {theme}</p>
        <p><strong>Unread Notifications:</strong> {unreadCount}</p>

        <button className="button" onClick={toggleTheme}>
          Toggle Theme
        </button>

        <div style={{ marginTop: '1rem' }}>
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`alert ${notif.read ? 'info' : 'success'}`}
              style={{ margin: '0.5rem 0' }}
            >
              <div className="flex">
                <span style={{ flex: 1 }}>{notif.message}</span>
                {!notif.read && (
                  <button 
                    className="button" 
                    onClick={() => markAsRead(notif.id)}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContextParent = () => (
  <div className="card" style={{ marginLeft: '1rem' }}>
    <h5>Parent Component (Context)</h5>
    <p>Clean! No props needed</p>
    <ContextChild />
  </div>
);

const ContextChild = () => (
  <div className="card" style={{ marginLeft: '1rem' }}>
    <h5>Child Component (Context)</h5>
    <p>Still clean! No props needed</p>
    <ContextGrandchild />
  </div>
);

const ContextGrandchild = () => {
  const { user, theme, notifications, markAsRead, toggleTheme } = useContext(AppContext);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="card" style={{ marginLeft: '1rem' }}>
      <h5>Grandchild Component (Direct Context Access)</h5>
      <div>
        <p><strong>User:</strong> {user.name} ({user.role})</p>
        <p><strong>Theme:</strong> {theme}</p>
        <p><strong>Unread Notifications:</strong> {unreadCount}</p>

        <button className="button" onClick={toggleTheme}>
          Toggle Theme
        </button>

        <div style={{ marginTop: '1rem' }}>
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`alert ${notif.read ? 'info' : 'success'}`}
              style={{ margin: '0.5rem 0' }}
            >
              <div className="flex">
                <span style={{ flex: 1 }}>{notif.message}</span>
                {!notif.read && (
                  <button 
                    className="button" 
                    onClick={() => markAsRead(notif.id)}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PropDrillingDemo = () => (
  <div>
    <Grandparent />
    <div className="alert info">
      <h4>Key Takeaways:</h4>
      <ul>
        <li>Prop drilling makes code harder to maintain and refactor</li>
        <li>Use React Context for deeply nested component communication</li>
        <li>Consider component composition patterns</li>
        <li>Don't overuse context - sometimes prop drilling is fine for shallow hierarchies</li>
        <li>Custom hooks can help extract and reuse stateful logic</li>
      </ul>
    </div>
  </div>
);

export default PropDrillingDemo;
