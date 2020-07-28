import React from "react";
import Header from "./header";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import MovieBox from "./movie-box";
import Loader from "./loader";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search_list: null,
      movies: null,
      genres: "",
      t: "Discover Movies",
    };
  }
  get_data = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=67da789cca6db17365f6961b7fd6c59d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    ).then((response) =>
      response.json().then((r) =>
        this.setState({
          movies: r.results,
        })
      )
    );
  };

  componentWillMount() {
    this.get_data();
  }
  // componentDidMount() {
  //   this.get_data();
  // }
  // componentWillUnmount() {
  //   this.get_data();
  // }

  searchchange = (e) => {
    const { value, name } = e.target;
    this.setState((prev) => ({
      ...prev,
      [name]: value,
      t: 'Search "' + value + '"',
    }));
    if (this.state.query !== "") {
      $.ajax({
        mode: "no-cors",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        url:
          "https://api.themoviedb.org/3/search/movie?query=" +
          this.state.query +
          "&genre=Adventure&api_key=67da789cca6db17365f6961b7fd6c59d",
        success: (response) => {
          //localStorage.setItem("search_list", JSON.stringify(response.results));
          this.setState((prev) => ({
            ...prev,
            movies: response.results,
          }));
        },
        error: function (error) {
          console.log(error);
        },
      });
      console.log(JSON.parse(localStorage.getItem("search_list")));
    } else {
      this.get_data();
      this.setState((prev) => ({
        ...prev,
        search_list: null,
        t: "Discover Movies",
      }));
    }
  };

  render() {
    return (
      <div className="home">
        <Header />
        <div className="home-header">
          <input
            type="text"
            placeholder="Search.."
            name="query"
            onKeyUp={this.searchchange}
            autoComplete="false"
          />
        </div>
        <div className="movies">
          <h1>{this.state.t}</h1>
          <div className="movies_list">
            {this.state.movies !== null ? (
              this.state.movies.map((d, key) => (
                <MovieBox
                  props={this.props}
                  data-id={d.id}
                  id={d.id}
                  title={d.title}
                  vote_average={d.vote_average}
                  release_date={d.release_date}
                  poster_path={d.poster_path}
                  key={key}
                />
              ))
            ) : this.state.search_list !== null ? (
              this.state.search_list
                .slice(0, 11)
                .map((d, key) => (
                  <MovieBox
                    props={this.props}
                    data-id={d.id}
                    id={d.id}
                    title={d.title}
                    vote_average={d.vote_average}
                    release_date={d.release_date}
                    poster_path={d.poster_path}
                    key={key}
                  />
                ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
