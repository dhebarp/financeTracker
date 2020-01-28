import React, { useState } from 'react';
import { calculatePayments } from '../components/subcomponents/MortgageData';
import Chart from './subcomponents/MortgageChart';

export function MortgageManager(props) {

  const [principal, setPrincipal] = useState(200000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);
  const { monthlyPayment: initialMonthlyPayment, totalInterest: initialTotalInterest, totalPayment: initialTotalPayment } = calculatePayments(principal, rate, years);
  console.log(typeof initialTotalInterest, initialTotalInterest, initialMonthlyPayment);
  const [monthlyPayment, setMonthlyPayment] = useState(initialMonthlyPayment);
  const [totalInterest, setTotalInterest] = useState(initialTotalInterest);
  const [totalPayment, setTotalPayment] = useState(initialTotalPayment);
  console.log(monthlyPayment, totalPayment, totalPayment)

  const [chartData, setChartData] = useState({
    chartData: {
      labels: ['Principal', 'interest', 'Balance']
    },
    datasets: [{
      label: 'Mortgage',
      data: [
        parseInt(monthlyPayment),
        parseInt(totalInterest),
        parseInt(totalPayment)
      ],
      backgroundColor: ['rgba(204, 102, 255,0.7)', 'rgba(71, 209, 71,1)', 'rgba(0, 153, 255,0.6)', 'rgba(255, 0, 102,0.6)']
    }]
  })


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('you clicked submit');
  };

  return (
    <div className={'container'}>
      <form onSubmit={handleSubmit}>
        <div className="form-inline">
          <label>Borrow Amount</label>
          <input name="principal" type="borrowAmount" value={principal} className="form-group mx-sm-3 mb-2" placeholder="700,000" onChange={e => {
            setPrincipal(e.target.value);
            const { monthlyPayment, totalInterest, totalPayment } = calculatePayments(e.target.value, rate, years);
            console.log(monthlyPayment, totalInterest, totalPayment);
            setMonthlyPayment(parseInt(monthlyPayment, 10));
            setTotalInterest(parseInt(totalInterest, 10));
            setTotalPayment(parseInt(totalPayment, 10));
            const newDataset = { ...chartData };
            newDataset.datasets[0].data = [monthlyPayment, totalInterest, totalPayment]
            newDataset.datasets[0].labels = ['Principal', 'interest', 'Balance']
            console.log('newDataset:', newDataset);
            setChartData(newDataset);
          }} />
        </div>
        <div className="form-inline">
          <label >Over</label>
          <input name="years" type="years" value={years} className="form-group mx-sm-3 mb-2" placeholder="30 Years" onChange={e => {
            setYears(e.target.value);
            const { monthlyPayment, totalInterest, totalPayment } = calculatePayments(principal, rate, e.target.value);
            setMonthlyPayment(monthlyPayment);
            setTotalInterest(totalInterest);
            setTotalPayment(totalPayment);
          }} />
        </div>
        <div className="form-inline">
          <label >Interest Rate</label>
          <input name="interest" type="interest" value={rate} className="form-group mx-sm-3 mb-2" placeholder="3.5%" onChange={e => {
            setRate(e.target.value);
            const { monthlyPayment, totalInterest, totalPayment } = calculatePayments(principal, e.target.value, years);
            setMonthlyPayment(monthlyPayment);
            setTotalInterest(totalInterest);
            setTotalPayment(totalPayment);
          }} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <Chart chartData={chartData} />
    </div>
  )
};