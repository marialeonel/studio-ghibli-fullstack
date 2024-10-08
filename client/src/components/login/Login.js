import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../contexts/AuthContext';
import authApi from '../../services/authApi';  // Importando a configuração do axios
import { useNavigate } from 'react-router-dom'; 

import './Login.css';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await authApi.post('/authentication/login', { email, password });
      const { token, refreshToken } = response.data;

      login({ email }, { accessToken: token, refreshToken });
      navigate('/home');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div>
      <div className='background-blur'></div>
      <div className='container-center-align'> 
        <div className='intern-style'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h2 className='text-center' style={{color: 'white'}}>Login</h2>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <div className='d-flex justify-content-center'>
            <Button onClick={handleLogin} variant="outline-light"  className="w-75">LOGIN</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
