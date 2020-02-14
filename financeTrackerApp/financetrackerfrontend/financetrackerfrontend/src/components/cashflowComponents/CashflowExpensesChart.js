import React, { useLayoutEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends React.Component {
     
    render() {
        return (
            <div className={'container'}>
                <Doughnut
                    data={this.props.chartData}
                    width={300}
                    height={300}
                    options={{ responsive: true, maintainAspectRatio: false, legend:{position: "right"}}}
                />
            </div>
        )
    }
}

export default Chart;