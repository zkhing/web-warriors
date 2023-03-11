import React, { useState } from 'react';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    
  }
  return (
    <div>
      <img src="our-image-url.jpg" alt="our" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">Email:</label>
      
        <input
          type="Email"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password 1 ">Password:</label>
        <input
          type="Password"
          id="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="Submit">Sign In</button>
      </form>
      <a href="#">Forgot Password?</a>
    </div>
  );
  
}

export default LoginPage;