import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import About from "./pages/About";
import Home from "./pages/Home";
import "./components/LoginPage.css"


const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/about/this/site" element={<About />} />
	</Routes>
);

export default App;
