import React from 'react'
import Header from './header'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'
import firebase from './config'
import Genre from './genre'
class MovieMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movie:null,
            isLoaded:false,
            genres:null,
            b:"Add to Bookmark"
        }
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
                        image:this.props.movie.poster_path,
                        year:this.props.movie.release_date.slice(0,4)
                    }
                ).then(()=>{
                    this.setState({
                        b:"Added"
                    })
                })
            }
    render(){
        return this.props.movie!==null?<div className='movie-main'>
        <div className='movie-main-left'>
            <div className='movie-left-top'>
                <img src={"https://image.tmdb.org/t/p/original/"+this.props.movie.poster_path} />
                <h2 >{this.props.movie.title}</h2>
                <p>{this.props.movie.production_companies[0].name}</p>
                <div style={{display:'flex',alignItems:'center'}} className='rating'>
                <i className="material-icons" style={{color:'rgb(212, 181, 1)'}}>star</i>
                <p style={{paddingLeft:'10px'}}>{
                    this.props.movie.vote_average
                }</p>
                </div>
                <div className='genre'>
                    {
                        this.props.movie.genres.map((d,key)=>{
                            return <p key={key}>{d.name}</p>
                        })
                    }
                </div>
                <p>{this.props.movie.release_date.slice(0,4)}</p>
                <a data-id={this.props.movie.id} data-name={this.props.movie.title} style={{cursor:'pointer',color:'white',width:'200px',height:'50px',backgroundColor:'#DB4437',borderRadius:'25px',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={this.add_book}><i style={{width:'30px',textAlign:'center'}}className="material-icons">bookmark</i>{this.state.b}</a>
            </div>
        </div>
        <div className='movie-main-right'>
            <div className='movie-right-top'>
                <h2>Overview</h2>
                <p>{this.props.movie.overview}</p>
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
                    localStorage.setItem('genre',data.genres[0].id!=='undefined'?data.genres[0].id:null)
                }
            )
        )
    }

    
    getSnapshotBeforeUpdate(prevProps, prevState){
        if (this.props !== prevProps) {
            this.get_movie()
            this.setState({
                b:'Add to Bookmark'
            })
        }
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
        return(
            <div className='movie' id='movie' style={{backgroundSize:'cover',background:this.state.movie!==null?"linear-gradient(to right, rgba(0,0,0,0.9) , rgba(0,0,0,.7)) ,url(https://image.tmdb.org/t/p/original"+movie.backdrop_path+")":"linear-gradient(to right, rgba(0,0,0,.9) , rgba(0,0,0,.5))"}}>
                <Header/>
                <MovieMain id={this.props.match.params.id} movie={movie} />
                <h3 style={{color:'white',paddingLeft:'20px'}}>Recommanded</h3>
                <Genre />
            </div>
        )
    }
}

export default withRouter(Movie)