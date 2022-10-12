import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default class App extends Component {
  state ={
    progress:0
  }
   // apikey ="6e7f5f6fedb44570938a9c131812f94e"
   apikey =process.env.REACT_APP_NEWS_API
  setProgress= (progress) => {
  this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />



          {/* if i remove catgory from here then it will take default category in news.js */}

          <Routes>
            {/* here only endpoints are changing not component */}
            {/* to resolve above propblem we are using exact and key (use to remount) */}

            <Route
              exact
              path="/"
              element={<News setProgress= {this.setProgress} apikey={this.apikey} key="general" country="in" category="general" />}
            />
            <Route
              exact
              path="/home"
              element={<News setProgress= {this.setProgress} apikey={this.apikey} key="general" country="in" category="general" />}
            />

            <Route
              exact
              path="/newsapp"
              element={<News setProgress= {this.setProgress} apikey={this.apikey} key="general" country="in" category="general" />}
            />

            <Route
              exact
              path="/sports"
              element={<News setProgress= {this.setProgress} apikey={this.apikey} key="sports" country="in" category="sports" />}
            />

            <Route
              exact
              path="/science"
              element={<News setProgress= {this.setProgress} apikey={this.apikey} key="science" country="in" category="science" />}
            />

            <Route
              exact
              path="/entertainment"
              element={
                <News
                setProgress= {this.setProgress} apikey={this.apikey} 
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            />
            

            <Route
              exact
              path="/business"
              element={<News setProgress= {this.setProgress} apikey={this.apikey} key="business" country="in" category="business" />}
            />

            <Route
              exact
              path="/technology"
              element={
                <News setProgress= {this.setProgress} apikey={this.apikey}  key="technology" country="in" category="technology" />
              }
            />

            <Route
              exact
              path="/health"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" country="in" category="health" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
