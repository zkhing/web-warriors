import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
