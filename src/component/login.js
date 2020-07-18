import React from "react";
import Header from "./header";
import firebase from "./config";
import { Link, Switch,Route } from "react-router-dom";
import ReviewBox from "./reviewbox";
import Footer from "./footer";
import logo from '../Movie-logo.png'
import LoginForm from "./form/loginform";
import RegisterForm from "./form/registerform";
class Login extends React.Component {
  render() {
    return (
      <div className="login" style={{background:'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1400&q=80)'}}>
        <div className="login-main">
          <img src={logo} width="150" height="70" />
          <Switch>
            <Route path="/login" component={LoginForm} exact />
            <Route path="/register" component={RegisterForm} exact />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
