import { createContext, useContext, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Create a local context for this demo
const UserContext = createContext();

// Provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: 'auto',
    language: 'en'
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <UserContext.Provider value={{
      user,
      preferences,
      login,
      logout,
      updatePreferences
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use UserContext
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// Components that consume context
const UserProfile = () => {
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();

  if (!user) {
    return <div className="alert info">Please log in to see your profile</div>;
  }

  return (
    <div className="card">
      <h4>User Profile</h4>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Current Theme:</strong> {theme}</p>
      <div className="flex">
        <button className="button secondary" onClick={logout}>
          Logout
        </button>
        <button className="button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

const UserPreferences = () => {
  const { preferences, updatePreferences } = useUser();

  return (
    <div className="card">
      <h4>User Preferences</h4>
      <div>
        <label>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) => updatePreferences({ notifications: e.target.checked })}
          />
          <span style={{ marginLeft: '0.5rem' }}>Enable Notifications</span>
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Language:
          <select
            className="input"
            value={preferences.language}
            onChange={(e) => updatePreferences({ language: e.target.value })}
            style={{ marginLeft: '0.5rem', width: 'auto' }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Theme:
          <select
            className="input"
            value={preferences.theme}
            onChange={(e) => updatePreferences({ theme: e.target.value })}
            style={{ marginLeft: '0.5rem', width: 'auto' }}
          >
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      login(formData);
    }
  };

  return (
    <div className="card">
      <h4>Login Form</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <select
          className="input"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

const UseContextDemo = () => {
  const { theme, fontSize } = useTheme();

  return (
    <div className="demo-container">
      <h2 className="demo-title">useContext Hook</h2>
      
      <div className="demo-description">
        <p><strong>useContext</strong> provides a way to pass data through the component tree without having to pass props down manually at every level. It's perfect for sharing global state like themes, user info, or preferences.</p>
      </div>

      <div className="code-block">
        {`const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

const MyComponent = () => {
  const { value, setValue } = useContext(MyContext);
  return <div>{value}</div>;
};`}
      </div>

      <UserProvider>
        <div className="demo-section">
          <h3>Context in Action</h3>
          <p>Current global theme: <strong>{theme}</strong></p>
          <p>Font size: <strong>{fontSize}</strong></p>
          
          <div className="grid">
            <LoginForm />
            <UserProfile />
            <UserPreferences />
          </div>
        </div>
      </UserProvider>

      <div className="demo-section">
        <h3>Context vs Prop Drilling</h3>
        
        <div className="grid">
          <div className="card">
            <h4>❌ Without Context (Prop Drilling)</h4>
            <div className="code-block">
              {`// Every component needs to pass props down
function App() {
  const [user, setUser] = useState(null);
  return <Header user={user} setUser={setUser} />;
}

function Header({ user, setUser }) {
  return <Navigation user={user} setUser={setUser} />;
}

function Navigation({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />;
}

function UserMenu({ user, setUser }) {
  // Finally use the props here
  return <div>{user?.name}</div>;
}`}
            </div>
          </div>

          <div className="card">
            <h4>✅ With Context</h4>
            <div className="code-block">
              {`// Clean and simple
function App() {
  return (
    <UserProvider>
      <Header />
    </UserProvider>
  );
}

function Header() {
  return <Navigation />;
}

function Navigation() {
  return <UserMenu />;
}

function UserMenu() {
  const { user } = useUser(); // Direct access!
  return <div>{user?.name}</div>;
}`}
            </div>
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>Context provides a way to share data without prop drilling</li>
          <li>Create context with createContext()</li>
          <li>Provide values with Context.Provider</li>
          <li>Consume with useContext() hook</li>
          <li>Components must be wrapped in Provider to access context</li>
          <li>Don't overuse context - it's not a replacement for all state management</li>
        </ul>
      </div>
    </div>
  );
};

export default UseContextDemo;