import { Route, Routes } from "react-router-dom";
import InputAvalibilityForm from "./components/InputAvalibilityForm";

import About from "./pages/About";
import Home from "./pages/Home";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/input" element={<InputAvalibilityForm />} />
		<Route path="/about/this/site" element={<About />} />
	</Routes>
);

export default App;
