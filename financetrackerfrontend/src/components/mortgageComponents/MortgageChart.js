import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2'

class Chart extends React.Component {
     
    render() {
        return (
            <>
             <div>
                <Line
                   data={this.props.linedata}
                   width={100}
                   height={200}
                   options={{ responsive: true, maintainAspectRatio: false }}/>
            </div>
            <div className='container'>
                <Doughnut
                    data={this.props.data}
                    width={100}
                    height={200}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            </div>
            </>
        )
    }
}

export default Chart;