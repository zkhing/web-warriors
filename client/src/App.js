import { Route, Routes } from "react-router-dom";
import InputAvailabilityForm from "./components/InputAvailabilityForm";
import MyAvailabilities from "./components/MyAvailabilities";
import "./components/InputAvailabilityForm.css";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/input" element={<InputAvailabilityForm />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/myavailability" element={<MyAvailabilities />} />
	</Routes>
);

export default App;
