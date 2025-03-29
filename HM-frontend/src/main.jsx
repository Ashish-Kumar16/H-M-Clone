import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Router defined here
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
// import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </>,
);
