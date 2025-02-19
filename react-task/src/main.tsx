// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {Provider} from 'react-redux';
import "./translation/i18n.ts";
import store from "./redux/store/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>,
);
