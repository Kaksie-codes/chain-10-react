import { useState, useMemo } from 'react';

// Expensive computation function
const expensiveCalculation = (num) => {
  console.log('🔥 Expensive calculation running...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return result + num;
};

// Complex filtering function
const filterUsers = (users, searchTerm, ageFilter) => {
  console.log('🔍 Filtering users...');
  return users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = ageFilter === 'all' || 
                      (ageFilter === 'young' && user.age < 30) ||
                      (ageFilter === 'middle' && user.age >= 30 && user.age < 50) ||
                      (ageFilter === 'senior' && user.age >= 50);
    return matchesSearch && matchesAge;
  });
};

// Component without useMemo (inefficient)
const WithoutMemo = ({ number }) => {
  const [count, setCount] = useState(0);
  
  // This will run on every render!
  const expensiveValue = expensiveCalculation(number);
  
  return (
    <div className="card">
      <h4>❌ Without useMemo</h4>
      <p>Expensive calculation result: {expensiveValue}</p>
      <p>Count: {count}</p>
      <button className="button" onClick={() => setCount(count + 1)}>
        Increment Count (causes re-render)
      </button>
      <p className="alert error">
        Check console - expensive calculation runs on every render!
      </p>
    </div>
  );
};

// Component with useMemo (efficient)
const WithMemo = ({ number }) => {
  const [count, setCount] = useState(0);
  
  // This will only run when 'number' changes!
  const expensiveValue = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);
  
  return (
    <div className="card">
      <h4>✅ With useMemo</h4>
      <p>Expensive calculation result: {expensiveValue}</p>
      <p>Count: {count}</p>
      <button className="button" onClick={() => setCount(count + 1)}>
        Increment Count (causes re-render)
      </button>
      <p className="alert success">
        Expensive calculation only runs when 'number' prop changes!
      </p>
    </div>
  );
};

const UseMemoDemo = () => {
  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 55 },
    { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 38 }
  ]);

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    return filterUsers(users, searchTerm, ageFilter);
  }, [users, searchTerm, ageFilter]);

  // Memoized statistics
  const userStats = useMemo(() => {
    console.log('📊 Calculating user statistics...');
    return {
      total: filteredUsers.length,
      averageAge: filteredUsers.length > 0 
        ? Math.round(filteredUsers.reduce((sum, user) => sum + user.age, 0) / filteredUsers.length)
        : 0,
      ageGroups: {
        young: filteredUsers.filter(user => user.age < 30).length,
        middle: filteredUsers.filter(user => user.age >= 30 && user.age < 50).length,
        senior: filteredUsers.filter(user => user.age >= 50).length
      }
    };
  }, [filteredUsers]);

  // Memoized factorial calculation
  const factorial = useMemo(() => {
    console.log('🔢 Calculating factorial...');
    const calculateFactorial = (n) => {
      if (n <= 1) return 1;
      return n * calculateFactorial(n - 1);
    };
    return calculateFactorial(number);
  }, [number]);

  return (
    <div className="demo-container">
      <h2 className="demo-title">useMemo Hook</h2>
      
      <div className="demo-description">
        <p><strong>useMemo</strong> is a React hook that memoizes the result of a calculation. It only recalculates when its dependencies change, helping to optimize performance by avoiding expensive computations on every render.</p>
      </div>

      <div className="code-block">
        {`const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]); // Only recalculates when a or b changes`}
      </div>

      <div className="demo-section">
        <h3>1. Basic Example - Expensive Calculations</h3>
        <p>Number: {number}</p>
        <div className="flex">
          <button className="button" onClick={() => setNumber(number + 1)}>
            Increment Number
          </button>
          <button className="button secondary" onClick={() => setNumber(number - 1)}>
            Decrement Number
          </button>
        </div>
        
        <div className="grid">
          <WithoutMemo number={number} />
          <WithMemo number={number} />
        </div>
      </div>

      <div className="demo-section">
        <h3>2. Memoized Factorial Calculation</h3>
        <p>Factorial of {number} = <strong>{factorial}</strong></p>
        <p>Current count: {count}</p>
        <button className="button" onClick={() => setCount(count + 1)}>
          Increment Count (won't recalculate factorial)
        </button>
        
        <div className="code-block">
          {`const factorial = useMemo(() => {
  const calculateFactorial = (n) => {
    if (n <= 1) return 1;
    return n * calculateFactorial(n - 1);
  };
  return calculateFactorial(number);
}, [number]); // Only recalculates when number changes`}
        </div>
      </div>

      <div className="demo-section">
        <h3>3. Complex Data Filtering</h3>
        
        <div className="flex">
          <input
            type="text"
            className="input"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <option value="all">All Ages</option>
            <option value="young">Young (&lt;30)</option>
            <option value="middle">Middle (30-49)</option>
            <option value="senior">Senior (50+)</option>
          </select>
        </div>

        <div className="card">
          <h4>📊 User Statistics</h4>
          <p><strong>Total Users:</strong> {userStats.total}</p>
          <p><strong>Average Age:</strong> {userStats.averageAge}</p>
          <p><strong>Age Distribution:</strong></p>
          <ul>
            <li>Young (&lt;30): {userStats.ageGroups.young}</li>
            <li>Middle (30-49): {userStats.ageGroups.middle}</li>
            <li>Senior (50+): {userStats.ageGroups.senior}</li>
          </ul>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {filteredUsers.map(user => (
            <div key={user.id} className="card">
              <h5>{user.name}</h5>
              <p>{user.email} • Age: {user.age}</p>
            </div>
          ))}
        </div>

        <div className="code-block">
          {`const filteredUsers = useMemo(() => {
  return filterUsers(users, searchTerm, ageFilter);
}, [users, searchTerm, ageFilter]);

const userStats = useMemo(() => {
  return {
    total: filteredUsers.length,
    averageAge: Math.round(
      filteredUsers.reduce((sum, user) => sum + user.age, 0) / filteredUsers.length
    )
  };
}, [filteredUsers]);`}
        </div>
      </div>

      <div className="demo-section">
        <h3>4. When NOT to use useMemo</h3>
        <div className="grid">
          <div className="card">
            <h4>❌ Don't use for:</h4>
            <ul>
              <li>Simple calculations (addition, subtraction)</li>
              <li>Creating objects/arrays that are used once</li>
              <li>When dependencies change frequently</li>
              <li>Over-optimization (premature optimization)</li>
            </ul>
            <div className="code-block">
              {`// Don't do this
const simpleSum = useMemo(() => a + b, [a, b]);

// Just do this
const simpleSum = a + b;`}
            </div>
          </div>
          
          <div className="card">
            <h4>✅ Use for:</h4>
            <ul>
              <li>Expensive calculations</li>
              <li>Complex data transformations</li>
              <li>Preventing unnecessary re-renders of child components</li>
              <li>Heavy filtering/sorting operations</li>
            </ul>
            <div className="code-block">
              {`// Good use case
const expensiveData = useMemo(() => {
  return heavyProcessing(largeDataSet);
}, [largeDataSet]);`}
            </div>
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>useMemo memoizes computation results, not components</li>
          <li>Only use when you have expensive calculations</li>
          <li>Dependencies array works like useEffect</li>
          <li>Don't overuse - memoization has its own cost</li>
          <li>Perfect for preventing unnecessary re-computations</li>
          <li>Check console logs to see when calculations run</li>
        </ul>
      </div>
    </div>
  );
};

export default UseMemoDemo;