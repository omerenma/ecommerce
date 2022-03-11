import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import nav from "../styles/nav.css";
import footer from "../styles/footer.css";
import home from "../styles/home.css";
import "../styles/design.css";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
	timeout: 5000,
	position: positions.MIDDLE_RIGHT,
	transitions: transitions.SCALE,
};

import Layout from "./layout";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<AlertProvider template={AlertTemplate} {...options}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AlertProvider>
		</Provider>
	);
}

export default MyApp;
