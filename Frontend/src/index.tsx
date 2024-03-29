import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store/index.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./Styles/index.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </BrowserRouter>
);
