import React from "react";
import ReactDOM from "react-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme()}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
