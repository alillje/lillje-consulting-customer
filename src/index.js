import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import axiosApiInstance from "./services/axios-interceptor";


ReactDOM.render(
  <Provider store={store}>
    <div className="wrapper">
    <App />
    </div>
  </Provider>,

  document.getElementById("root")
);

// ReactDOM.render(
//   <Provider store={store}>
//   <App />
//   </Provider>,

// document.getElementById('root')
// );
