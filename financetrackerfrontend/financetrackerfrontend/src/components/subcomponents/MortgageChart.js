import React from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={'container'}>
                <Doughnut
                    data={this.props.chartData}
                    width={100}
                    height={200}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            </div>
        )
    }
}

export default Chart;