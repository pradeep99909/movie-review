import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from './header'
import BookMarkMain from './bookmark-main'



class BookMark extends React.Component{
    render(){
        return(
            <div className='bookmark'>
                <Header />
                <BookMarkMain />
            </div>
        )
    }
}

export default withRouter(BookMark)