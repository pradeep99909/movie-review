import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import history from "./history";
import Home from "./component/home";
import Movie from "./component/movie";
import Bookmark from "./component/bookmark";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Redirect from="/" to="/home" />
          <Switch>
            <Route path="/movie/:id" component={Movie} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Login} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/bookmark" component={Bookmark} exact />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
