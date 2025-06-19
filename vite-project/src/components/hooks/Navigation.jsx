import './Navigation.css';

const Navigation = ({ activeSection, setActiveSection }) => {
  const sections = [
    { key: 'useState', label: 'useState', icon: '🔢' },
    { key: 'useEffect', label: 'useEffect', icon: '⚡' },
    { key: 'useContext', label: 'useContext', icon: '🌐' },
    { key: 'useReducer', label: 'useReducer', icon: '⚙️' },
    { key: 'useMemo', label: 'useMemo', icon: '🧠' },
    { key: 'useCallback', label: 'useCallback', icon: '📞' },
    { key: 'useRef', label: 'useRef', icon: '🎯' },
    { key: 'customHooks', label: 'Custom Hooks', icon: '🔧' },
    { key: 'propDrilling', label: 'Prop Drilling', icon: '🕳️' },
    { key: 'modals', label: 'Modals', icon: '🪟' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {sections.map(section => (
          <button
            key={section.key}
            className={`nav-button ${activeSection === section.key ? 'active' : ''}`}
            onClick={() => setActiveSection(section.key)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;