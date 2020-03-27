import React, { useState } from 'react';
import { calculatePayments } from './MortgageData'
import Chart from './MortgageChart';
import Table from './MortgageTable';

export function MortgageManager() {

  const [principal, setPrincipal] = useState(200000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);
  const { monthlyPayment: initialMonthlyPayment, totalInterest: initialTotalInterest, totalPayment: initialTotalPayment } = calculatePayments(principal, rate, years);
  // console.log(typeof initialTotalInterest, initialTotalInterest, initialMonthlyPayment);
  const [monthlyPayment, setMonthlyPayment] = useState(initialMonthlyPayment);
  const [totalInterest, setTotalInterest] = useState(initialTotalInterest);
  const [totalPayment, setTotalPayment] = useState(initialTotalPayment);
  const [name, setName] = useState('')
  const { payments } = calculatePayments(
    +principal,
    +rate,
    +years,
  );

  const [pieChartData, setPieChartData] = useState({
    labels: ["Monthly Payment", "Total Interest", "Total Payment"],
    datasets: [{
      data: [
        parseInt(monthlyPayment),
        parseInt(totalInterest),
        parseInt(totalPayment)
      ],
      backgroundColor: ['rgba(204, 102, 255,0.7)', 'rgba(71, 209, 71,1)', 'rgba(0, 153, 255,0.6)', 'rgba(255, 0, 102,0.6)']
    }]
  })

  const [lineChartData, setLineChartData] = useState({
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    datasets: [{
      data: payments.map(a => a.balance),
      label: 'Balance Over Time',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }]
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('you clicked submit');

    createNewMortgage();
  };

 const createNewMortgage = () => {

    fetch("mortgage/new", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        planName: name,
        loanAmount: principal,
        interestRate: rate,
        loanDuration: years,
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-inline">
              <label >Plan Name</label>
              <input name="name" type="interest" value={name} className="form-group mx-sm-3 mb-2" placeholder="e.g. Option 1" onChange={e => { setName(e.target.value) }} />
            </div>
            <div className="form-inline">
              <label>Borrow Amount</label>
              <input name="principal" value={principal} className="form-group mx-sm-3 mb-2" placeholder="700,000" onChange={e => {
                setPrincipal(e.target.value);
                const { monthlyPayment, totalInterest, totalPayment } = calculatePayments(e.target.value, rate, years);
                // console.log(monthlyPayment, totalInterest, totalPayment);
                setMonthlyPayment(parseInt(monthlyPayment, 10));
                setTotalInterest(parseInt(totalInterest, 10));
                setTotalPayment(parseInt(totalPayment, 10));

                const newChartDataset = { ...pieChartData };
                newChartDataset.datasets[0].data = [monthlyPayment, totalInterest, totalPayment];
                const newLineChartDataset = { ...lineChartData };
                newLineChartDataset.datasets[0].data = payments.map(a => a.balance);
                const arr2 = []

                for (let i = 0; i < payments.length; i++) {
                  arr2.push(i)
                }
                newLineChartDataset.labels = arr2;

                setPieChartData(newChartDataset);
                setLineChartData(newLineChartDataset);
              }} />
            </div>
            <div className="form-inline">
              <label >Years</label>
              <input name="years" type="years" value={years} className="form-group mx-sm-3 mb-2" placeholder="30 Years" onChange={e => {
                setYears(e.target.value);
                const { monthlyPayment, totalInterest, totalPayment } = calculatePayments(principal, rate, e.target.value);
                setMonthlyPayment(parseInt(monthlyPayment, 10));
                setTotalInterest(parseInt(totalInterest, 10));
                setTotalPayment(parseInt(totalPayment, 10));
              }} />
            </div>
            <div className="form-inline">
              <label >Interest Rate</label>
              <input name="interest" type="interest" value={rate} className="form-group mx-sm-3 mb-2" placeholder="3.5%" onChange={e => {
                setRate(e.target.value);
                const { monthlyPayment, totalInterest, totalPayment } = calculatePayments(principal, e.target.value, years);
                setMonthlyPayment(parseInt(monthlyPayment, 10));
                setTotalInterest(parseInt(totalInterest, 10));
                setTotalPayment(parseInt(totalPayment, 10));
              }} />
              <button type="submit" className="btn btn-success mb-2" onClick={handleSubmit}>Save Plan</button>
            </div>
          </form>
        </div>
        <div className="col">
        </div>
      </div>
      <Chart pieChartData={pieChartData} lineChartData={lineChartData} />
      <br />
      <Table payments={payments} />
    </div>
  )
};