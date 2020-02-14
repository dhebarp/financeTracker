import React, { useState, useEffect } from 'react';
import { categories, months } from './CashFlowCategories';
import Chart from './CashflowExpensesChart';

export function CashflowManager() {

  const [incomes, setIncomes] = useState({});
  const [expenses, setexpenses] = useState([]);
  const [category] = useState(categories.slice(1, 12));
  const [results, setResults] = useState([])
  const [month, setMonth] = useState('');
  const [chartData, setChartData] = useState({
    labels: category, //labels need to match data
    datasets: [{
      data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], //hardcoded values for now.
      backgroundColor: [
        'rgba(115, 24, 111, 0.9)',
        'rgba(37, 42, 17, 0.6)',
        'rgba(182, 158, 125, 0.8)',
        'rgba(183, 164, 179, 0.8)',
        'rgba(137, 105, 111, 0.6)',
        'rgba(22, 128, 92, 0.5)',
        'rgba(253, 69, 43, 0.5',
        'rgba(113, 200, 49, 0.8)',
        'rgba(253, 149, 36, 0.8)',
        'rgba(145, 232, 131, 0.7)',
        'rgba(5, 214, 225, 1)'
      ]
    }]
  });

const cashflowFetch = event => {
}
    fetch(`/cashflow/view/${month}`,
    {
        method: "GET",
        credentials: "same-origin",
        })
    .then(async data => {
            const newData = await data.json();
            console.log(newData);
    })


  return (
    <React.Fragment>
      <div className="container">
        <div className="input-group input-group-sm mb-3">
          <select className="custom-select" value={month} onChange={(event) => setMonth(event.target.value)} >
            {months.map(month => {
              return <option>{month}</option>
            })}
          </select>
        </div>
      </div>
      <Chart chartData={chartData} />

    </React.Fragment>
  )
}