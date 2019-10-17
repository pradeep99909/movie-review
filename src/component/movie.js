import React from 'react'
import Header from './header'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'
import firebase from './config'
class Genre extends React.Component{
    constructor(props){
        super(props)
        this.state={
            genre:null
        }
    }

    get_genres=()=>{
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=67da789cca6db17365f6961b7fd6c59d&with_genres="+localStorage.getItem('genre')).
                        then(
                            response=>response.json().then(
                                data=>{
                                    this.setState(
                                        {
                                            genre:data
                                        }
                                    )

                                    localStorage.setItem('movie-genres',JSON.stringify(data))
                                
                                }
                                )
                            
                        )
    }


    componentWillMount=()=>{
        this.get_genres()
    }
    componentDidMount=()=>{
        this.get_genres()
    }
    componentWillUnmount=()=>{
        this.get_genres()
    }

    
    movie=e=>{
            this.props.history.go("/movie/"+e.target.dataset['id'])
    }
    render(){
        return (
            <div className='movie-genres'>
                    {   
                        localStorage.getItem('movie-genres')!==null
                        ?
                        JSON.parse(localStorage.getItem('movie-genres')).slice(0,4).map((d,key)=>{
                            return <div className='movie-box' data-id={d.id} onClick={this.movie} id={key} style={{backgroundSize:'cover',backgroundImage:'linear-gradient(to top, rgba(0,0,0,0.9) 5%, rgba(0,0,0,0)),url(https://image.tmdb.org/t/p/original'+ d.poster_path+')'}}>
                                <div className="movie-box-bottom">
                                <h3>{d.title}</h3>
                                <div><p>{d.release_date.slice(0,4)}</p>
                                </div>
                                <div>
                                <i className="material-icons">star</i>
                                    <p style={{paddingLeft:'10px'}}>{
                                    d.vote_average
                                    }</p>
                                </div>
                                </div>
                            </div>
                        })
                        :
                        null
                    }
                </div>
        )
    }
}
class MovieMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movie:null,
            isLoaded:false,
            genres:null
        }
    }

    get_movie=()=>{
    
        fetch("https://api.themoviedb.org/3/movie/" +
        this.props.id +
        "?api_key=67da789cca6db17365f6961b7fd6c59d&language=en-US").then(
            response=>response.json().then(
                data=>{
                    this.setState({
                        movie:data,
                        isLoaded:true
                    })
                }
            )
        )
    }

    
                    


    componentWillMount() {
        this.get_movie()
    }
    componentDidMount(){
        this.get_movie()
    }

        

            add_book=(e)=>{
                const id=e.target.dataset['id']
                const name=e.target.dataset['name']
                e.preventDefault()
                const uid=firebase.auth().currentUser.uid
                const database=firebase.database()
                database.ref().child('bookmark').child(uid).push(
                    {
                        id:id,
                        title:name,
                        image:this.state.movie.poster_path,
                        year:this.state.movie.release_date.slice(0,4)
                    }
                ).then(()=>{
                    alert('Added to Bookmark')
                })
            }
    render(){
        const m=this.state.movie
        return this.state.isLoaded===true
        ?
        <div className='movie-main'>
        <div className='movie-main-left'>
            <div className='movie-left-top'>
                <img src={"https://image.tmdb.org/t/p/original/"+m.poster_path} />
                <h2 >{m.title}</h2>
                <p>{m.production_companies[0].name}</p>
                <div style={{display:'flex',alignItems:'center'}} className='rating'>
                <i className="material-icons" style={{color:'rgb(212, 181, 1)'}}>star</i>
                <p style={{paddingLeft:'10px'}}>{
                    m.vote_average
                }</p>
                </div>
                <div className='genre'>
                    {
                        m.genres.map((d,key)=>{
                            return <p>{d.name}</p>
                        })
                    }
                </div>
                <p>{m.release_date.slice(0,4)}</p>
                <a data-id={m.id} data-name={m.title} style={{cursor:'pointer',color:'red'}} onClick={this.add_book}>Add to Bookmark</a>
            </div>
        </div>
        <div className='movie-main-right'>
            <div className='movie-right-top'>
                <h2>Overview</h2>
                <p>{m.overview}</p>
            </div>
            <div className='movie-right-bottom'>
                
            </div>
        </div>
    </div>:null

    }
}

class Movie extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movie:null
        }
    }

    get_movie=()=>{
    
        fetch("https://api.themoviedb.org/3/movie/" +
        this.props.match.params.id +
        "?api_key=67da789cca6db17365f6961b7fd6c59d&language=en-US").then(
            response=>response.json().then(
                data=>{
                    this.setState({
                        movie:data
                    })
                    localStorage.setItem('genre',data.genres[0].name)
                }
            )
        )
        console.log(this.state)
    }

    componentWillMount() {
        this.get_movie()
    }
    componentDidMount(){
        this.get_movie()
    }
    componentWillUnmount(){
        this.get_movie()
    }
    render(){
        const movie=this.state.movie
        console.log(movie)
        return(
            <div className='movie' id='movie' style={{backgroundSize:'cover',background:this.state.movie!==null?"linear-gradient(to right, rgba(0,0,0,0.9) , rgba(0,0,0,.7)) ,url(https://image.tmdb.org/t/p/original"+movie.backdrop_path+")":"linear-gradient(to right, rgba(0,0,0,.9) , rgba(0,0,0,.5))"}}>
                <Header/>
                <MovieMain id={this.props.match.params.id} movie={movie} />
            </div>
        )
    }
}

export default withRouter(Movie)