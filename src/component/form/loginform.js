import React from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  login = (e) => {
    e.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          localStorage.setItem("movie-logined", true);
          localStorage.setItem("movie-user-id", user.user.uid);
          localStorage.setItem("movie-user-name", user.user.displayName);
          this.props.history.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  google = () => {
    const { history } = this.props;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        history.push("/home");
        localStorage.setItem("user_email", firebase.auth().currentUser.email);
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  render() {
    return (
      <form>
        <div className="input-form">
          <h3 style={{ marginBlockStart: 0 }}>Login</h3>
        </div>
        <div className="input-form">
          <input
            style={{ marginTop: "0" }}
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handlechange}
          />
        </div>
        <div className="input-form">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handlechange}
          />
        </div>
        <button onClick={this.login}>Login</button>

        {/* <p onClick={this.google} style={{width:'200px',height:'40px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#DB4437',fontWeight:'bold',cursor:'pointer'}}>Login using Google</p> */}
        <div className="input-form">
          <Link
            style={{ color: "#22BE2B", fontSize: "14px", cursor: "pointer" }}
          >
            Forgot Password
          </Link>
        </div>
        <div className="input-form">
          <Link
            to="/register"
            style={{ color: "#22BE2B", fontSize: "14px", cursor: "pointer" }}
          >
            Register
          </Link>
        </div>
      </form>
    );
  }
}

export default LoginForm;
