import { useState } from 'react'

import './App.css'

export default function App() {
 

  return (
    <div className="App">
  <Sendotp/>
  <Verifyotp/>
        
    </div>
  )
}



function Sendotp() {
 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
      setMessage('Failed to send OTP');
    }
  };
  return (
    <div className="App">
  <h1>Reset Password</h1>
      <form onSubmit={handleSendOtp}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

function Verifyotp(){

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp,password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
      setMessage('Failed to reset password');
    }
  };


  return(
    <div>
 <form onSubmit={handleResetPassword}>
        <label>OTP:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}