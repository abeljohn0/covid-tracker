import React from 'react'

class MenuBar extends React.Component{
    
    render(){
        const stylebar = {
            border: "1px solid #800000",
            backgroundColor: "#FFFDD0",
            padding: "0",
            margin: "0",
           // display: "inline-block",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "12px",
            color: "black",
            opacity: "0.8",
            flex: "1"
        }

        const menustyling = {
            maxHeight: "20vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch"
        }

        function changeColor(e) {
            //e.target.style.color = 'red';
            e.target.style.opacity = '0.5';
          }
        function reverse(e) {
            //prop.target.style.color = 'black';
            e.target.style.opacity = '0.8';
          }  
        return(        
        <div style= {menustyling}>
            <div style={stylebar} href="#cases" onMouseClick={changeColor} onMouseLeave={reverse}>
               <a href="#cases"> 
                    <h2>COVID Case Tracker</h2>
                </a>  
            </div>
            <div style={stylebar} onMouseClick={changeColor} onMouseLeave={reverse}> 
                <a href="#news">             
                    <h2>COVID Newsfeed</h2>
                </a>
            </div>
            <div style={stylebar} onMouseClick={changeColor} onMouseLeave={reverse}> 
                <a href="#news">  
                    <h2>Your System Info</h2>
                </a>    
            </div>
            <div style={stylebar} onMouseClick={changeColor} onMouseLeave={reverse}> 
                <a href="#abt">            
                    <h2>About Us</h2>
                </a>    
            </div>
        </div>    
        );
    }
}

export default MenuBar