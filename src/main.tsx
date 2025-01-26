// src/index.tsx

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Globalstore/Store";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
