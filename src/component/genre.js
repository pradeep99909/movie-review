import { withRouter,  } from 'react-router-dom'
import React from 'react'

class Genre extends React.Component{
    constructor(props){
        super(props)
        this.state={
            genre:null,
            load:false
        }
        this.get_genres=this.get_genres.bind(this)
    }

    async get_genres(){
        await fetch("https://api.themoviedb.org/3/discover/movie?api_key=67da789cca6db17365f6961b7fd6c59d&with_genres="+localStorage.getItem('genre')).
                        then(
                            response=>response.json().then(
                                data=>{
                                    this.setState(
                                        {
                                            genre:data.results
                                        }
                                    )
                                
                                }
                                )
                            
                        )

    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        if (this.props !== prevProps) {
            this.get_genres()
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }
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
        this.props.history.push("/movie/"+e.target.dataset['id'])
    }

    
    render(){
        return (
            <div className='movie-genres'>
                    {   
                        this.state.genre!==null
                        ?
                        this.state.genre.map((d,key)=>{
                            return <div className='movie-box' data-id={d.id} onClick={this.movie} key={key} style={{backgroundSize:'cover',backgroundImage:'linear-gradient(to top, rgba(0,0,0,0.9) 5%, rgba(0,0,0,0)),url(https://image.tmdb.org/t/p/original'+ d.poster_path+')'}}>
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
                        })
                        :
                        null
                    }
                </div>
        )
    }
}

export default withRouter(Genre)