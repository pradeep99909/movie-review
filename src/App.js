import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import history from './history'
import Home from './component/home'
import Movie from './component/movie'
import Bookmark from "./component/bookmark";

class App extends React.Component {
  render() {
    // fetch(
    //   "https://api.themoviedb.org/3/movie/76341?api_key=67da789cca6db17365f6961b7fd6c59d"
    // ).then(json => json.json().then(data => console.log(data)));
    return (
      <Router history={history}>
        <div className="App">
          <Route path="/movie/:id" component={Movie} />
          <Route path="/" component={Login} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/bookmark" component={Bookmark} exact />
        </div>
      </Router>
    );
  }
}

export default App;
