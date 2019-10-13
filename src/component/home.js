import React from "react";
import Header from "./header";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // fetch(
    //   "https://api.themoviedb.org/3/search/movie?query=Avengers&api_key=67da789cca6db17365f6961b7fd6c59d",
    //   {
    //     credentials: "include",
    //     method: "get",
    //     headers: { "Content-Type": "application/json" }
    //   }
    // ).then(file =>
    //   file.json().then(data =>
    //     this.setState({
    //       search_list: data
    //     })
    //   )
    // );
    this.state = {
      query: "",
      search_list: {}
    };
  }

  searchchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
            list="movie-list"
            onChange={this.searchchange}
          />
          <datalist id="movie-list">
            {fetch(
              "https://api.themoviedb.org/3/search/movie?query=Avengers&api_key=67da789cca6db17365f6961b7fd6c59d",
              {
                credentials: true,
                method: "get"
              }
            ).then(file =>
              file
                .json()
                .then(data =>
                  localStorage.setItem("movie-data", JSON.stringify(data))
                )
            )}
            this.state.search_list.map(d => console.log(d))}
          </datalist>
        </div>
      </div>
    );
  }
}

export default Home;
