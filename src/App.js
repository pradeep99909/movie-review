import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import Home from "./component/home";
import CreateBrowserHistory from "history";

class App extends React.Component {
  render() {
    // fetch("https://api.themoviedb.org/3/movie/76341?api_key=67da789cca6db17365f6961b7fd6c59d").then(
    //   json=>json.json().then(
    //     data=>console.log(data)
    //   )
    // )
    return (
      <BrowserRouter history={CreateBrowserHistory}>
        <div className="App">
          <Route path="/home" component={Login} exact />
          <Route path="/" component={Home} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
