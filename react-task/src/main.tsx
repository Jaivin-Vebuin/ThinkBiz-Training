import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./translation/i18n.ts";
import store from "./redux/store/store.ts";
import { AuthProvider } from "./context/user/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </Provider>
);
