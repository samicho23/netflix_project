import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthForm({ isLoginModeInit }) {
  const [isLogin, setIsLogin] = useState(isLoginModeInit);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin 
      ? "http://localhost:5000/api/auth/login" 
      : "http://localhost:5000/api/auth/register";

    try {
      const response = await axios.post(endpoint, { email, password });
      if (response.data.success) {
        if (isLogin) {
          localStorage.setItem('token', response.data.token);
          navigate('/browse'); 
        } else {
          alert('user registered successfully! please login tocontinue');
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'error occurred , please try again later');
    }
  };

  return (
    <div className="authForm" style={{ background: 'rgba(0,0,0,0.85)', padding: '60px', borderRadius: '4px', width: '100%', maxWidth: '450px', boxSizing: 'border-box' }}>
      <h2 style={{ color: 'white', marginBottom: '28px', fontSize: '32px' }}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      {error && <p style={{ color: 'white', background: '#e87c03', padding: '10px', borderRadius: '4px', fontSize: '14px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '16px', margin: '10px 0', background: '#333', color: 'white', border: 'none', borderRadius: '4px', height: '50px', boxSizing: 'border-box' }}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '16px', margin: '10px 0', background: '#333', color: 'white', border: 'none', borderRadius: '4px', height: '50px', boxSizing: 'border-box' }}
          required 
        />
        <button type="submit" style={{ padding: '15px', background: '#e50914', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '24px', borderRadius: '4px', height: '50px' }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p style={{ color: '#737373', marginTop: '20px', cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New to Netflix? Sign up now.' : 'Already have an account? Sign in.'}
      </p>
    </div>
  );
}

export default AuthForm;