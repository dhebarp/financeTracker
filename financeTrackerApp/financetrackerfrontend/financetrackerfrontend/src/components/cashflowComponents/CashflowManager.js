import React, { useState, useEffect } from 'react';
import { categories, months } from './CashFlowCategories';
import Chart from './CashflowExpensesChart';

export function CashflowManager() {

  const [incomes, setIncomes] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState(categories.slice(1, 12));
  // add calculations to state here
  const [month, setMonth] = useState('');
  const [doughnut, setDoughnut] = useState({});
  const [pie, setPie] = useState({})
  const [bar, setBar] = useState({
    labels: category, //labels need to match data
    datasets: [{
      data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], //hardcoded values for now.
      backgroundColor: ['rgba(115, 24, 111, 0.9)','rgba(37, 42, 17, 0.6)','rgba(182, 158, 125, 0.8)','rgba(183, 164, 179, 0.8)',
        'rgba(137, 105, 111, 0.6)','rgba(22, 128, 92, 0.5)','rgba(253, 69, 43, 0.5','rgba(113, 200, 49, 0.8)','rgba(253, 149, 36, 0.8)',
        'rgba(145, 232, 131, 0.7)','rgba(5, 214, 225, 1)']
    }]
  });



  useEffect(() => {
    fetch(`/cashflow/view/${month}`,
      {
        method: "GET",
        credentials: "same-origin",
      })
      .then(async data => {
        const newData = await data.json();
        setIncomes(newData[0].incomes);
        setExpenses(newData[0].expenses);
        // setCategory(newData[0].expenses);
        setPie({
          labels: ["Primary Income", "Investment Income", "Other Income"], //labels need to match data
          datasets: [{
            data: Object.values(newData[0].incomes), //hardcoded values for now.
            backgroundColor: ['rgba(115, 24, 111, 0.9)','rgba(37, 42, 17, 0.6)','rgba(182, 158, 125, 0.8)']
          }]
        });
        const updatedExpenses = newData[0].expenses.slice(1, 100).map(a => a.amount);
        const updatedCategoryList = newData[0].expenses.slice(1, 100).map(a => a.category);

        setDoughnut({
          labels: updatedCategoryList, //labels need to match data
          datasets: [{
            data: updatedExpenses,
            backgroundColor: ['rgba(115, 24, 111, 0.9)','rgba(37, 42, 17, 0.6)','rgba(182, 158, 125, 0.8)','rgba(183, 164, 179, 0.8)','rgba(137, 105, 111, 0.6)','rgba(22, 128, 92, 0.5)','rgba(253, 69, 43, 0.5','rgba(113, 200, 49, 0.8)','rgba(253, 149, 36, 0.8)','rgba(145, 232, 131, 0.7)','rgba(5, 214, 225, 1)']
          }]
        })
      }).catch(err => {
        console.log(err);
      })
  }, [month]);


  return (
    <React.Fragment>
      
      <div className="container">
        <div className="input-group input-group-sm mb-3">
          <select className="custom-select" value={month} onChange={(event) => setMonth(event.target.value)} >
            {months.map((month, index) => {
              return <option key={index.month}>{month}</option>
            })}
          </select>
        </div>
      </div>
      <Chart doughnutData={doughnut} barChartData={bar} pieChartData={pie}/>
      <br />
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Primary Income</th>
              <th scope="col">Investment Income</th>
              <th scope="col">Other Income</th>
            </tr>
          </thead>
          <tbody>
          <tr>
                <td>${incomes.primaryIncome}</td>
                <td>${incomes.investmentIncome}</td>
                <td>${incomes.otherIncome}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <br/>
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Expense Name</th>
              <th scope="col">Expense Category</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.slice(1,50).map((expense, index) => { //bit of a hack, need to fix this! 
              return (<tr>
                <td key={index.name}>{expense.name}</td>
                <td key={index.category}>{expense.category}</td>
                <td key={index.amount}>${expense.amount}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}