import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2'

class Chart extends React.Component {
     
    render() {
        return (
            <>
            <div className='container'>
                <Doughnut
                    data={this.props.pieChartData}
                    width={100}
                    height={200}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            </div>
            <div>
                <Line
                   data={this.props.lineChartData}
                   width={100}
                   height={200}
                   options={{ responsive: true, maintainAspectRatio: false }}/>
            </div>
            </>
        )
    }
}

export default Chart;