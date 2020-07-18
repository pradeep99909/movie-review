import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <div className="footer" >
                <p style={{color:'white',padding:'15px',fontSize:'14px'}}>Source code for this website can be found on Github. By <a href="https://www.github.com/pradeep99909" target="_blank" style={{color:'#22BE2B',fontWeight:'bold'}}>Pradeep Kshirsagar</a> </p>
            </div>
        )
    }
}

export default Footer