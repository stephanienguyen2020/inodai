import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

import "./scss/volt.scss";

import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <HashRouter>
    <ScrollToTop />
    <HomePage />
  </HashRouter>,
  document.getElementById("root")
);
