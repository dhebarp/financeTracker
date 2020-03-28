import React, { useState, useEffect } from 'react';
import { calculatePayments } from './MortgageData'
import Chart from './MortgageChart';
import Table from './MortgageTable';
import { numberWithCommas } from '/Users/paritoshdhebar/Documents/ga_sei_projects/unit4_project/financetrackerfrontend/src/utils/format';

export function MortgageManager() {

  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const { monthlyPayment, totalInterest, totalPayment, payments } = calculatePayments(principal, rate, years);
  // console.log(typeof initialTotalInterest, initialTotalInterest, initialMonthlyPayment);
  // const [monthlyPayment, setMonthlyPayment] = useState('');
  // const [totalInterest, setTotalInterest] = useState('');
  // const [totalPayment, setTotalPayment] = useState('');
  const [name, setName] = useState('');
  const [plans, setPlans] = useState([]);
  const [renderInfo, setrenderInfo] = useState(false);
  const [toggleAction, settoggleAction] = useState(false)
  const [action, setAction] = useState(0)

  useEffect(() => {

    fetch("/mortgage/view",
      {
        method: "GET",
        credentials: "same-origin",
      })
      .then(async data => {
        const newData = await data.json();
        setPlans(newData);
      })

  }, [plans])

  const piedata = {
    data: {
      labels: [
        'Monthly Payment',
        'Total Interest',
        'Total Payments'
      ],
      datasets: [{
        data: [monthlyPayment, totalInterest, totalPayment],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    }
  };

  const arr2 = []

  for (let i = 0; i < payments.length; i++) {
    arr2.push(i)
  }

  const linedata = {
    data: {
      labels: arr2,
      datasets: [
        {
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
        }
      ]
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('you clicked submit');

    createNewMortgage();
    newMortgageForm();
  };

  const newMortgageForm = () => {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h2>New Loan Calculation</h2>
          <form onSubmit={handleSubmit}>
            <div class="form-row">
              <div className="form-group">
                <label >Plan Name</label>
                <input name="name" value={name} className="form-control" placeholder="e.g. Option 1" onChange={e => { setName(e.target.value) }} />
              </div>
              <div className="form-group">
                <label>Borrow Amount</label>
                <input name="principal" value={principal} className="form-control" placeholder="e.g. 700000" onChange={e => { setPrincipal(e.target.value); }} />
              </div>
              <div className="form-group">
                <label >Years</label>
                <input name="years" value={years} className="form-control" placeholder="e.g. 30" onChange={e => { setYears(e.target.value); }} />
              </div>
              <div className="form-group">
                <label >Interest Rate</label>
                <input name="interest" value={rate} className="form-control" placeholder="e.g. 3.5" onChange={e => { setRate(e.target.value); }} />
              </div>
            </div>
            <button type="submit" className="btn btn-success mb-2" onClick={handleSubmit}>Save Plan</button>
          </form>
        </div>
      </React.Fragment>
    )
  }

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

  const updateMortagage = () => {

  }

  const deleteMortgage = (id) => {

    const onePlan = plans.filter(plan => plan.planName === name)
    id = onePlan[0]._id
    console.log(id);

    fetch(`/mortgage/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: "same-origin",
    }) // body data type must match "Content-Type" header
      .then(() => {
        setPlans(plans => [...plans]);
      })
      .catch((e) => console.log(e));
  }

  const viewMortgage = (name) => {

    const onePlan = plans.filter(plan => plan.planName === name)
    setPrincipal(onePlan[0].loanAmount);
    setRate(onePlan[0].interestRate);
    setYears(onePlan[0].loanDuration);

  };

  return (
    <div className="container">
      <div className="input-group input-group-sm mb-3">
        <select className="custom-select" value={name} onChange={e => {
          setName(e.target.value); viewMortgage(e.target.value);
        }}>
          <option selected>Select a plan</option>
          {plans.map((plan, id) => {
            return <option key={id}>{plan.planName}</option>
          })}
        </select>
        <div className="dropdown" onClick={() => { settoggleAction(!toggleAction) && setAction(0)} }>
          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Options
          </button>
          <div className={`dropdown-menu${toggleAction ? "show" : ""}`} aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" onClick={() => setAction(1)} type="button">Create New Plan</button>
            <button className="dropdown-item" onClick={() => setAction(2)} type="button">Update Plan</button>
            <button className="dropdown-item" onClick={() => deleteMortgage()} type="button">Delete Plan</button>
            <button className="dropdown-item" onClick={() => setAction(0)} type="button">Close</button>
          </div>
        </div>
      </div>
      {action ===1 && newMortgageForm()}
      {action ===2 && updateMortagage()}
      <div className="col">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Monthly Payment</h5>
                <p className="card-text">${numberWithCommas(monthlyPayment)}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Interest</h5>
                <p className="card-text">${numberWithCommas(totalInterest)}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Payment</h5>
                <p className="card-text">${numberWithCommas(totalPayment)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chart data={piedata.data} linedata={linedata.data} />
      <br />
      <Table payments={payments} />
    </div>
  )
};