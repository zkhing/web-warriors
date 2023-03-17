import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username);
    try {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();
      console.log(data);
      if (data.length === 1) {
        alert("Go to availability link.");
      } else {
        alert("Username not found.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage;