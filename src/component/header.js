import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "./config";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
      user: null
    };
  }
  componentWillMount() {
    if (!firebase.auth().currentUser) {
      this.props.history.push("/login");
    } else {
      this.setState((prev) => ({
        user: firebase.auth().currentUser.displayName
      }));
    }
  }
  home = () => {
    if (!firebase.auth().currentUser) {
      this.props.history.push("/login");
    } else {
      this.props.history.push("/home");
    }
  };
  open = (e) => {
    this.state.display === "none"
      ? this.setState({
          display: "block"
        })
      : this.setState({
          display: "none"
        });
  };
  profile = () => {
    this.props.history.push("/profile");
  };

  book = () => {
    this.props.history.push("/bookmark");
  };
  logout = (e) => {
    this.props.history.push("/login");
    firebase.auth().signOut();
  };
  render() {
    return (
      <div className="header">
        <p onClick={this.home}>Movie</p>
        {firebase.auth().currentUser ? (
          <div className="header-right">
            <div className="header-top" onClick={this.open}>
              <i className="material-icons">account_circle</i>
              <p>
                {this.state.user !== null || this.state.user !== "undefined"
                  ? this.state.user
                  : "Movie Watcher"}
              </p>
            </div>
            <div
              style={{ display: this.state.display, zIndex: 2 }}
              className="header-bottom"
            >
              <div className="header-list" onClick={this.profile}>
                Profile
              </div>
              <div className="header-list" onClick={this.book}>
                Bookmarks
              </div>
              <div className="header-list" onClick={this.logout}>
                Logout
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Header);
