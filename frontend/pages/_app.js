import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import nav from "../styles/nav.css";
import footer from "../styles/footer.css";
import home from "../styles/home.css";

import Layout from "./layout";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
