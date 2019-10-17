import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from './header'
import firebase from './config'

class BookMarkMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bookmark:null
        }
    }
    get_bookmark=()=>{
        firebase.database().ref("bookmark").child(firebase.auth().currentUser.uid)
            .on('value',(snapshot)=>{
                this.setState(
                    {
                        bookmark:snapshot.val()
                    }
                )
            })
    }
    componentWillMount() {
        this.get_bookmark()
    }
    componentDidMount(){
        this.get_bookmark()
    }
    componentWillUnmount(){
        this.get_bookmark()
    }
    movie=e=>{
        this.props.history.push("/movie/"+e.target.dataset['id'])
    }
    remove=e=>{
        const elem=firebase.database().ref("bookmark/"+firebase.auth().currentUser.uid).child(e.target.dataset['item'])
        elem.remove().then(()=>{
            this.get_bookmark()
        }
            
        ).catch(
            (error)=>{
                console.log(error)
            }
        )
        console.log(e.target.dataset['item'])
    }
    render(){
        return(
            <div className='bookmark-main'>
                <h2>Bookmarks</h2>
                <div className='bookmark-list'>
                    {   this.state.bookmark?
                        Object.keys(this.state.bookmark).map((item,key)=>
                        <div className='movie-box' key={key} style={{backgroundSize:'cover',backgroundImage:'linear-gradient(to top, rgba(0,0,0,0.9) 5%, rgba(0,0,0,0)),url(https://image.tmdb.org/t/p/original'+this.state.bookmark[item].image+')'}}>
                            <div className='movie-box-top'>
                                <i onClick={this.remove} data-item={item} className='material-icons'>delete</i>
                            </div>
                            <div data-id={this.state.bookmark[item].id} onClick={this.movie} className="movie-box-bottom">
                                <h3 data-id={this.state.bookmark[item].id}>{this.state.bookmark[item].title}</h3>
                                <div data-id={this.state.bookmark[item].id}><p data-id={this.state.bookmark[item].id}>{this.state.bookmark[item].year}</p>
                                </div>
                            </div>
                        </div>
                        ):null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(BookMarkMain)