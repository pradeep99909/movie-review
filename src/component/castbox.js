import React from "react";
import Cast from "./cast";

class CastBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      casts: null
    };
  }
  get_cast = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    ).then((res) =>
      res
        .json()
        .then((data) =>
          this.setState((prev) => ({ ...prev, casts: data.cast }))
        )
    );
    //console.log(this.state.casts);
  };
  componentWillMount() {
    this.get_cast();
  }
  componentDidUpdate() {
    this.get_cast();
  }
  render() {
    return (
      <div className="castbox">
        <h3 style={{ color: "white", paddingTop: "10px" }}>Casts</h3>
        <div className="casts">
          {this.state.casts !== null
            ? this.state.casts.map((d, key) => (
                <Cast
                  actor_image={d.profile_path}
                  actor={d.name}
                  character={d.character}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default CastBox;
