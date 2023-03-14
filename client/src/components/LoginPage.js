import { useState, useEffect } from "react";

// import { Container, Col, Row, Button, Form, Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";



const handleClick = () => {
	let username = document.getElementById("loginInput").value;
	fetch(`http://localhost:3100/api/users/${username}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.length === 1) {
				<a href="http://localhost:3000/input"> </a>;
			}
			else { alert("the username you entered does not match any student") }
		})
}


function LoginPage() {
	return (
		<div className="login_page">

			<input placeholder="username" type="text" id="loginInput" ></input>
			<button onClick={handleClick}> Login</button>
		</div>
	)
}


export default LoginPage;

/* <div>
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
	  {/* <a href="#">Forgot Password?</a> */
