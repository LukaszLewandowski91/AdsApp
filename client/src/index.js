import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Router } from "express";

const Root = () => {
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>;
};

ReactDOM.render(<Root />, document.getElementById("root"));
