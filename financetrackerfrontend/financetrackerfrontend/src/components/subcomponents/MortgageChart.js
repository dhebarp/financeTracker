import React from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Principal', 'interest', 'Balance'],
                datasets: [{
                    label: 'Mortgage', 
                    data: [
                        34234234324,
                        234234234234,
                        23423423423432
                    ],
                    backgroundColor: ['rgba(204, 102, 255,0.7)','rgba(71, 209, 71,1)','rgba(0, 153, 255,0.6)','rgba(255, 0, 102,0.6)']
                }]
            }
        }
    }
    render() {
        return (
            <div className={'container'}>
                <Doughnut
                    data={this.state.chartData}
                    width={100}
                    height={200}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            </div>
        )
    }
}

export default Chart;