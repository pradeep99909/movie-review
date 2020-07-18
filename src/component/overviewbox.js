import React from "react";

class OverviewBox extends React.Component {
  render() {
    return (
      <div className="overviewbox" style={{ padding: "100px 0px" }}>
        <h2 style={{ marginBlock: "50px" }}>Overview</h2>
        <p>{this.props.overview}</p>
      </div>
    );
  }
}

export default OverviewBox;
