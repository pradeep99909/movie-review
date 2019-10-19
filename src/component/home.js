import React from "react";
import Header from "./header";
import $ from "jquery";
import {withRouter} from 'react-router-dom'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search_list: null,
      movies: null,
      genres:"",
      t: "Discover Movies"
    };
  }
  get_data=()=>{
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=67da789cca6db17365f6961b7fd6c59d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1").then(
                  response=>response.json().then(
                    r=>this.setState({
                      movies:r.results
                    })
                  )
    )
  }

  componentWillMount() {
    this.get_data()
  }
  componentDidMount(){
    this.get_data()
  }
  componentWillUnmount(){
    this.get_data()
  }


  searchchange = e => {
    const {value,name}=e.target
    this.setState((prev)=>(
      {
      ...prev,
      [name]: value,
      t:'Search "'+value+'"'
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
        success: function(response) {
          localStorage.setItem("search_list", JSON.stringify(response.results));
          
        },
        error: function(error) {
          console.log(error);
        }
      }).done(
        this.setState({
          search_list: JSON.parse(localStorage.getItem("search_list")),
          movies:null
        })
      )
      console.log(JSON.parse(localStorage.getItem("search_list")));
    }
    else{
      this.get_data()
      this.setState((prev)=>(
        {
          ...prev,
          search_list:null,
          t:"Discover Movies"
        }
      ))
    }
  };

  movie=(e)=>{
    this.props.history.push("/movie/"+e.target.dataset['id'])

  }

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
            { this.state.movies !== null
              ? this.state.movies.map((d,key) => (
                  <div className='movie-box' data-id={d.id} onClick={this.movie} key={key} style={{backgroundSize:'cover',backgroundImage:'linear-gradient(to top, rgba(0,0,0,0.9) 5%, rgba(0,0,0,0)),url(https://image.tmdb.org/t/p/original'+ d.poster_path+')'}}>
                    <div className="movie-box-bottom">
                    <h3 data-id={d.id}>{d.title}</h3>
                    <div><p data-id={d.id}>{d.release_date.slice(0,4)}</p>
                    </div>
                    <div>
                    <i data-id={d.id} className="material-icons">star</i>
                      <p data-id={d.id} style={{paddingLeft:'10px'}}>{
                        d.vote_average
                      }</p>
                    </div>
                    </div>
                  </div>
                  
    ))
              : (
                this.state.search_list!==null?
                this.state.search_list.slice(0, 11).map(d => (
                  <div className='movie-box' data-id={d.id} onClick={this.movie} id={d.key} style={{backgroundSize:'cover',backgroundImage:'linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0)),url(https://image.tmdb.org/t/p/original/'+ d.poster_path+')'}}>
                    <div className="movie-box-bottom">
                    <h3>{d.title}</h3>
                    <div><p>{d.release_date.slice(0,4)}</p>
                    <div className="movie-genre">
                    {
                      d.genre_ids.map((d,key)=>{
                        
                        return <p></p>
                      })
                    }
                    </div></div>
                    <div>
                    <i className="material-icons">star</i>
                      <p style={{paddingLeft:'10px'}}>{
                        d.vote_average
                      }</p>
                    </div>
                    </div>
                </div>
                  
    )):
                null
                )} 
                
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
