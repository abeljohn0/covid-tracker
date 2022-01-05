import React from 'react'
import jsonfile from "./covid_by_states.json"

class Tracker extends React.Component{
    constructor(props){
        super(props);
        this.state={value: '', dispcovid: false, st8: '', county:'', st82:''}

        this.Changecounty = this.Changecounty.bind(this);
        this.Changedisp = this.Changedisp.bind(this);
        this.Changestate= this.Changestate.bind(this);
    }

    Changecounty(event){
        this.setState({value: event.target.value})
    }

    Changedisp(){
        this.setState({dispcovid: true})
        this.setState({county: this.state.value})
        this.setState({st82: this.state.st8})
    }

    Changestate(event){
            console.log("state button")
            this.setState({st8: event.target.value})
    }

    render(){
        const styling={
            color: "white", 
            fontWeight: "bold", 
            background: "black"
        }

        function GetLocalPosts(props){
            console.log(props.cty)
            console.log(props.bool)
            console.log(props.st8)
            var x = JSON.parse(jsonfile)
            var state = props.st8
            var county = props.cty
            
            if(!props.bool)
            {
                return(
                    <div style={styling}>Enter your data here!</div>
                )
            }
            else if(county!==undefined)
            {
                var y = x[state][county]
                if(y!==undefined)
                {
                    return(
                        <div style={styling}>
                            <h2>
                                {county}, {state} cases today
                            </h2>
                            <ul>
                                Total Cases: {y["total cases"]}
                            </ul>
                            <ul>
                                % of State Cases: {y["% of states cases"]}
                            </ul>
                            <ul>
                                Cases per 100k: {y["cases per 100k"]}
                            </ul>
                            <ul>
                                Total Deaths: {y["total deaths"]}
                            </ul>
                        </div>
                    );  
                }
                else
                {
                    return(
                        <div style={styling}>County not found...try again!</div>
                    )                      
                }
            }
            else
            {
                return(
                    <div style={styling}>County not found...try again!</div>
                )  
            }
        }
        return(
            <div style={{minHeight: "1000px", height: "30vh"}}>
                <form className= "Text-Formatting">
                    <label >Type your County Name:
                        <input type="text" value={this.state.value} onChange={this.Changecounty}></input>
                    </label>    
                </form>
                <select name="state" id="state" onChange={this.Changestate}>
                    <option value="" selected="selected">Select a State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
                    <button  onMouseDown={() => this.Changedisp()}>Submit</button>
                    <GetLocalPosts cty= {this.state.county} bool={this.state.dispcovid} st8={this.state.st82}/>
            </div>
                );
    }
}

export default Tracker