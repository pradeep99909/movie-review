import React from "react";
import Header from "./header";
import firebase from "./config";
import { Link } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handlechange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  login = e => {
    e.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.history.push("/home");
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };
  render() {
    return (
      <div className="login">
        <Header />
        <div className="login-main">
          <form>
            <div className="input-form">
              <label>Email</label>
              <input type="email" name="email" onChange={this.handlechange} />
            </div>
            <div className="input-form">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handlechange}
              />
            </div>
            <button onClick={this.login}>Login</button>
            <p style={{ fontSize: "14px" }}>
              Not Registered?&nbsp;
              <Link
                style={{ color: "red", textDecoration: "none" }}
                to="/register"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
