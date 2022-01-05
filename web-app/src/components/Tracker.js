import React from 'react'
import Grapher from './Grapher'

class Tracker extends React.Component{
    constructor(props){
        super(props);
        this.state={dispcovid: false, st8: '', st82:'', items: [], tot_cases: [], tot_deaths: [], truedates: []}
        this.Changedisp = this.Changedisp.bind(this);
        this.Changestate= this.Changestate.bind(this);
        this.JSONextractor= this.JSONextractor.bind(this);
    }

    Changedisp(){
        this.setState({dispcovid: true})
        this.setState({st82: this.state.st8})
                    this.JSONextractor()
    }

    Changestate(event){
            this.setState({st8: event.target.value})
    }

    JSONextractor(){
        fetch('https://data.cdc.gov/resource/9mfq-cb36.json?state=' + this.state.st8)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json
                })
            });

        for(var x=this.state.items.length-1; x>=0; x--){
           // import moment
            this.state.items[x]["submission_date"] = new Date(this.state.items[x]["submission_date"])
            //this.state.items[x]["submission_date"] = moment(this.state.items[x]["submission_date"])
           //this.state.items[x]["submission_date"] = dateformat(this.state.items[x]["submission_date"], yyyy:mm:dd')
        }
        /*
            for(var y=0; y<x; y++){
                if(this.state.items[y]["submission_date"]>this.state.items[y+1]["submission_date"])
                {
                    var temp=this.state.items[y]
                    truedates[y]=this.state.items[y+1]
                    truedates[y+1]=temp
                }
            }
        }*/
        this.state.truedates = this.state.items.slice().sort((a, b) => a["submission_date"] - b["submission_date"])

        console.log(this.state.truedates)
    }

    render(){
        const styling={
            color: "white", 
            fontWeight: "bold", 
            background: "black"
        }

    //const casevalues=this.state.items.map(x => ({cases: x["tot_cases"], deaths: x["tot_death"], date: x["submission_date"]}) )
    const casevalues=this.state.truedates.map(x => x["tot_cases"] )
    const death=this.state.truedates.map(x => x["tot_death"] )
    const date=this.state.truedates.map(x => x["submission_date"] )
        function StateCount(props){
            console.log(props.bool)
            console.log(casevalues)
            //var y = JSON.stringify(props.statedata)
           // var x = JSON.parse(y)
        if(!props.bool)

            return("Choose your state and hit submit!")
        if(props.bool)
            return(<Grapher cases={casevalues} deaths={death} dates={date}/>)
           // var state = props.st8                
           /* if(!props.bool)
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
            }*/
        }
        return(
            <div style={{minHeight: "1000px", height: "30vh"}}>
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
                    <button onMouseDown={() => this.Changedisp()}>Submit</button>                
                    <StateCount bool={this.state.dispcovid} st8={this.state.st82} statedata={this.state.items}/>
                        
            </div>
                );
    }
}

export default Tracker