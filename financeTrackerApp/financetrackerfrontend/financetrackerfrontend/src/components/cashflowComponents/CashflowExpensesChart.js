import React from 'react';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';

class Chart extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className={'container'}>
                    <div class="row">
                        <div class="col">
                            <Doughnut
                                data={this.props.doughnutData}
                                width={200}
                                height={200}
                                options={{ responsive: true, maintainAspectRatio: false, legend: { position: "right" } }}
                            />
                        </div>
                        <div class="col">
                            <Bar
                                data={this.props.barChartData}
                                width={200}
                                height={200}
                                options={{ responsive: true, maintainAspectRatio: false, legend: { position: "top" } }}
                            />
                        </div>
                        <div class="col">
                            <Pie
                                data={this.props.pieChartData}
                                width={200}
                                height={200}
                                options={{ responsive: true, maintainAspectRatio: false, legend: { position: "top" } }}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Chart;