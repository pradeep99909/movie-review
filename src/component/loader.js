import React from "react";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="loader"
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div className="circle"></div>
      </div>
    );
  }
}

export default Loader;
