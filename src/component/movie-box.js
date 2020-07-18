import React from "react";

class MovieBox extends React.Component {
  constructor(props) {
    super(props);
  }
  movie = (e) => {
    this.props.props.history.push("/movie/" + e.target.dataset["id"]);
  };
  render() {
    return (
      <div
        className="movie-box"
        data-id={this.props.id}
        onClick={this.movie}
        key={this.props.key}
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 5%, rgba(0,0,0,0)),url(https://image.tmdb.org/t/p/original" +
            this.props.poster_path +
            ")"
        }}
      >
        <div data-id={this.props.id} className="movie-box-bottom">
          <h3 data-id={this.props.id}>{this.props.title}</h3>
          <div data-id={this.props.id}>
            <p data-id={this.props.id}>
              {this.props.release_date
                ? this.props.release_date.slice(0, 4)
                : null}
            </p>
          </div>
          <div data-id={this.props.id}>
            <i data-id={this.props.id} className="material-icons">
              star
            </i>
            <p data-id={this.props.id} style={{ paddingLeft: "10px" }}>
              {this.props.vote_average}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieBox;
