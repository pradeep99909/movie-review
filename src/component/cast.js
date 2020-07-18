import React from "react";

class Cast extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          marginLeft: 20,
          flex: 1,
          width: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          style={{
            borderRadius: 100 / 2,
            resizeMode: "cover",
            height: "100px",
            width: "100px",
            backgroundSize: "cover"
          }}
          src={
            this.props.actor_image !== null
              ? `http://image.tmdb.org/t/p/w500${this.props.actor_image}`
              : "http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-hi.png"
          }
        />
        <div>
          <p
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            {this.props.actor}
          </p>
          <p style={{ color: "#949494", textAlign: "center" }}>
            {this.props.character}
          </p>
        </div>
      </div>
    );
  }
}

export default Cast;
