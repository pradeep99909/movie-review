import React from "react";
import Header from "./header";
import $ from "jquery";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search_list: null,
      movies: null,
      t: "Discover Movies"
    };
  }
  UNSAFE_componentWillMount() {
    $.ajax({
      type: "GET",
      dataType: "json",
      cors: true,
      contentType: "application/json",
      //secure: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      //contentType: "application/json;charset=UTF-8",
      url:
        "https://api.themoviedb.org/3/discover/movie?api_key=67da789cca6db17365f6961b7fd6c59d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1",
      success: function(response) {
        response.header("Access-Control-Allow-Headers:'*'");
        localStorage.setItem("movies", JSON.stringify(response.results));
      },
      error: function(error) {
        console.log(error);
      }
    }).done(
      this.setState({
        movies: JSON.parse(localStorage.getItem("movies"))
      })
    );
  }

  searchchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.state.query !== "") {
      $.ajax({
        mode: "no-cors",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        url:
          "https://api.themoviedb.org/3/search/movie?query=" +
          this.state.query +
          "&api_key=67da789cca6db17365f6961b7fd6c59d",
        success: function(response) {
          localStorage.setItem("search_list", JSON.stringify(response.results));
          this.setState({
            search_list: JSON.parse(localStorage.getItem("search_list"))
          });
        },
        error: function(error) {
          console.log(error);
        }
      });
      //console.log(JSON.parse(localStorage.getItem("search_list")));
    }

    const genres = [
      "Romantic",
      "Horror",
      "Action",
      "Fiction",
      "Documentary",
      "Thriller",
      "Drama",
      "Mystery"
    ];
    //console.log(this.state.movies);
    return (
      <div className="home">
        <Header />
        <div className="home-header">
          <select placeholder="Genres" onChange={this.searchchange}>
            {genres.map(d => (
              <option value={d}>{d}</option>
            ))}
          </select>
          <input
            type="year"
            min="1990"
            max="2019"
            placeholder="Starting from(Year)"
          />
          <input
            type="year"
            min="1990"
            max="2019"
            placeholder="Ended In(Year)"
          />
          <input
            type="text"
            placeholder="Search.."
            name="query"
            list="movie-list"
            onChange={this.searchchange}
            autoComplete="false"
          />
          <datalist id="movie-list">
            {this.state.search_list !== null
              ? this.state.search_list.map(d => {
                  console.log(d.title);
                })
              : null}
            <option value="hello" />
          </datalist>
        </div>
        <div className="movies">
          <h1>{this.state.t}</h1>
          <div className="movies_list">
            {this.state.movies !== null
              ? localStorage.getItem("movies").map(d => {
                  <div id={d.key}>
                    <img src="" />
                  </div>;
                })
              : "Sorry Some Error has Happen"}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
