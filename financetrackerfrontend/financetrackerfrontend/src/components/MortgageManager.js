import React, { useState } from 'react';
import { calculatePayments } from '../components/subcomponents/MortgageData';
import Chart from './subcomponents/MortgageChart';

export function MortgageManager(props) {

  const [principal, setPrincipal] = useState('200000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('25');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);


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
            const {monthlyPayment, totalInterest, totalPayment} = calculatePayments(e.target.value, rate, years);
            setMonthlyPayment(monthlyPayment);
            setTotalInterest(totalInterest);
            setTotalPayment(totalPayment);
           }}/>
        </div>
        <div className="form-inline">
          <label >Over</label>
          <input name="years" type="years" value={years} className="form-group mx-sm-3 mb-2" placeholder="30 Years" onChange={e => {
            setYears(e.target.value);
            const {monthlyPayment, totalInterest, totalPayment} = calculatePayments(principal, rate, e.target.value);
            setMonthlyPayment(monthlyPayment);
            setTotalInterest(totalInterest);
            setTotalPayment(totalPayment);
          }} />
        </div>
        <div className="form-inline">
          <label >Interest Rate</label>
          <input name="interest" type="interest" value={rate} className="form-group mx-sm-3 mb-2" placeholder="3.5%" onChange={e => {
            setRate(e.target.value);
            const {monthlyPayment, totalInterest, totalPayment} = calculatePayments(principal, e.target.value, years);
            setMonthlyPayment(monthlyPayment);
            setTotalInterest(totalInterest);
            setTotalPayment(totalPayment);
            }} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <Chart monthlyPayment={monthlyPayment} totalInterest={totalInterest} totalPayment={totalPayment}/>
    </div>
  )
};