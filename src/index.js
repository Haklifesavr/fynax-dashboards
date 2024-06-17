import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "AppContext/context";
import { AppProvider } from "AppContext/AppProvider";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
