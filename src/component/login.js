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
  }

  google=()=>{
    const {history}=this.props
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      history.push("/home")
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message)
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }


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
            
            <p onClick={this.google} style={{width:'200px',height:'40px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#DB4437',fontWeight:'bold',cursor:'pointer'}}>Login using Google</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
