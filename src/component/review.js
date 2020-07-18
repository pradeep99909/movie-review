import React from 'react'
import firebase from './config'

class Review extends React.Component{
    constructor(){
        super()
        this.state={
            reviews:null
        }
    }
    get_reviews=()=>{
        var database = firebase.database()
        database.ref("/review").once('value').then((snap)=>{
            this.setState((prev)=>({...prev,reviews:snap.val()}))
        })
        console.log(this.state)
    }
    componentWillMount(){
        this.get_reviews()
    }

    componentDidMount(){
        this.get_reviews()
    }


    render(){
        
        return(
            this.state.review
            ?
            <div className="review">
                <p>Reviews</p>
                {
                    this.state.reviews.map
                }
            </div>
            :
            null
        )
    }
}

export default Review