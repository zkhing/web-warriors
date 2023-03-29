import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import InputAvailabilitiesPage from "./components/InputAvailabilitiesPage";
import About from "./pages/About";
import "./components/LoginPage.css";
import "./components/Hero.js";
import Hero from "./components/Hero.js";
import AboutUs from "./components/AboutUs";
import ViewAllAvailabilities from "./components/ViewAllAvailabilities";
import CurrentUserMatching from "./components/CurrentUserMatching";

const App = () => (
	<Routes>
		<Route path="/" element={<Hero />} />
		<Route path="/home" element={<Hero />} />
		<Route path="/login" element={<LoginPage />} />
		<Route
			path="/InputAvailabilitiesPage"
			element={<InputAvailabilitiesPage />}
		/>
		<Route path="/ViewAllAvailabilities" element={<ViewAllAvailabilities />} />
		<Route path="/CurrentUserMatching" element={<CurrentUserMatching />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/AboutUs" element = {<AboutUs />} /> 
		<Route path="/about/this/site" element={<About />} />
	</Routes>
);

export default App;
