import React from 'react';

function Header() {
  return (
    <nav>
      <div className="logo">
        <img src="./logo.png" alt="Logo" />
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
}

export default Header;
