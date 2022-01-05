import React from 'react'
import Chart from "react-apexcharts";

class Grapher extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
                options: {
                  chart: {
                    id: "line-graph"
                  },
                  xaxis: {
                    categories: this.props.dates
                  }
                },
                series: [
                  {
                    name: "series-1",
                    data: this.props.cases
                  }
                ]
        };
        
    }
    render(){
     // console.log(this.props.dates)
        return (
            <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width="500"
                  />
                </div>
              </div>
            </div>
          );
    }
}
export default Grapher