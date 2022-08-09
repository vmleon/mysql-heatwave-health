import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Workshop from './components/Workshop';
import './App.css';
import Login from './Login';

const isLogged = (token) => {
  const logged = token && token.length;
  return logged;
};

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  if (isLogged(token)) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Workshop token={token} setToken={setToken} />}>
            {/* <Route path="/:id" element={<Labs />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <Login token={token} setToken={setToken} />;
  }
}

export default App;
