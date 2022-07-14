import "../styles/globals.css";
import Layout from "../components/Layout.js";
import store from "../components/redux/store.js";
import { Provider } from "react-redux";

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
