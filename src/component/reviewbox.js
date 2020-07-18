import React from 'react'

class ReviewBox extends React.Component{
    render(){
        return(
            <div className="review-box">
                <div className="review-box-top">
                    <img src={"https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=845&q=80"} />
                    <div className="review-box-top-right">
                        <p style={{fontWeight:'600'}}>Name</p>
                        <p><i class="material-icons">star</i>&nbsp;4.5</p>
                    </div>
                </div>
                <div className="review-box-bottom">
                    <p style={{color:'white',fontSize:'15px'}}>
                    Proin eget tortor risus. Proin eget tortor risus. 
                    Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur 
                    aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat.
                    </p>
                </div>
            </div>
        )
    }
}


export default ReviewBox