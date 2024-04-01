import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Define a functional component to wrap the ReactDOM.createRoot call
const Root = () => {
  return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
  );
};

// Render the Root component using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
