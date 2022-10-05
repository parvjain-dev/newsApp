import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />

          {/* if i remove catgory from here then it will take default category in news.js */}

          <Routes>
            {/* here only endpoints are changing not component */}
            {/* to resolve above propblem we are using exact and key (use to remount) */}

            <Route
              exact
              path="/"
              element={<News key="general" country="in" category="general" />}
            />
            <Route
              exact
              path="/home"
              element={<News key="general" country="in" category="general" />}
            />

            <Route
              exact
              path="/newsapp"
              element={<News key="general" country="in" category="general" />}
            />

            <Route
              exact
              path="/sports"
              element={<News key="sports" country="in" category="sports" />}
            />

            <Route
              exact
              path="/science"
              element={<News key="science" country="in" category="science" />}
            />

            <Route
              exact
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={<News key="general" country="in" category="general" />}
            />

            <Route
              exact
              path="/business"
              element={<News key="business" country="in" category="business" />}
            />

            <Route
              exact
              path="/technology"
              element={
                <News key="technology" country="in" category="technology" />
              }
            />

            <Route
              exact
              path="/health"
              element={<News key="health" country="in" category="health" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
