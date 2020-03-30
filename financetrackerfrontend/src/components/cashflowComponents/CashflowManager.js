import React, { useState, useContext, useEffect } from 'react';
import { categories, months } from './CashFlowCategories';
import Chart from './CashflowExpensesChart';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '/Users/paritoshdhebar/Documents/ga_sei_projects/unit4_project/financetrackerfrontend/src/utils/format';
import { GlobalContext } from '/Users/paritoshdhebar/Documents/ga_sei_projects/unit4_project/financetrackerfrontend/src/context/GlobalState.js';


export function CashflowManager() {
  const [incomes, setIncomes] = useState({});
  const [expenses, setExpenses] = useState([]);
  // add calculations to state here
  const [month, setMonth] = useState("Please Select");
  const [doughnut, setDoughnut] = useState({});
  const [pie, setPie] = useState({});
  const [bar, setBar] = useState({});
  const [RenderInfo, setRenderInfo] = useState(false);

  // eslint-disable-next-line
  const { getCashflow } = useContext(GlobalContext);

  useEffect(() => {
    // getCashflow();
    // console.log(getCashflow);
    fetch(`/cashflow/view/${month}`,
      {
        method: "GET",
        credentials: "same-origin",
      })
      .then(async data => {
        const newData = await data.json();

        if (newData.data !== null) {
          setIncomes(newData.data.incomes);
          setExpenses(newData.data.expenses);
          setRenderInfo(true);
          // setCategory(newData[0].expenses);

          const mappedCategories = categories.map(cat => {
            return { category: cat, amount: 0 }
          })

          const expenseData = newData.data.expenses // need to refactor this.
          const result = expenseData.reduce((accumulator, currentValue) => {
            //find the index of the category
            const indx = accumulator.findIndex((cat) => cat.category === currentValue.category);

            //update the amount for this category
            accumulator[indx].amount += currentValue.amount;

            //return the accumulator for the next iteration
            return accumulator
          }, mappedCategories);

          const resultNoZeroes = result.filter(cat => cat.amount > 0);

          const updatedIncomes = Object.values(newData.data.incomes)
          const updatedExpenses = resultNoZeroes.map(a => a.amount);
          const updatedCategoryList = resultNoZeroes.map(a => a.category);

          setPie({
            labels: ["Primary Income", "Investment Income", "Other Income"],
            datasets: [{
              data: updatedIncomes,
              backgroundColor: ['rgba(115, 24, 111, 0.9)', 'rgba(37, 42, 17, 0.6)', 'rgba(182, 158, 125, 0.8)']
            }]
          });

          setDoughnut({
            labels: updatedCategoryList,
            datasets: [{
              data: updatedExpenses,
              backgroundColor: ['rgba(115, 24, 111, 0.9)', 'rgba(37, 42, 17, 0.6)', 'rgba(182, 158, 125, 0.8)', 'rgba(183, 164, 179, 0.8)', 'rgba(137, 105, 111, 0.6)', 'rgba(22, 128, 92, 0.5)', 'rgba(253, 69, 43, 0.5', 'rgba(113, 200, 49, 0.8)', 'rgba(253, 149, 36, 0.8)', 'rgba(145, 232, 131, 0.7)', 'rgba(5, 214, 225, 1)']
            }]
          });

          setBar({
            labels: updatedCategoryList,
            datasets: [{
              label: "Expenses",
              data: updatedExpenses,
              backgroundColor: ['rgba(115, 24, 111, 0.9)', 'rgba(37, 42, 17, 0.6)', 'rgba(182, 158, 125, 0.8)', 'rgba(183, 164, 179, 0.8)',
                'rgba(137, 105, 111, 0.6)', 'rgba(22, 128, 92, 0.5)', 'rgba(253, 69, 43, 0.5', 'rgba(113, 200, 49, 0.8)', 'rgba(253, 149, 36, 0.8)',
                'rgba(145, 232, 131, 0.7)', 'rgba(5, 214, 225, 1)']
            }]
          });
        } else {
          setRenderInfo(false);
        }
      }).catch(err => {
        console.log(err);
      })
  }, [month]);

  const expenseSum = expenses.map(a => a.amount);
  const IncomeSum = Object.values(incomes)

  return (
    <React.Fragment>
      <div className="container">
        <div className="input-group input-group-sm mb-3">
          <select className="custom-select" value={month} onChange={(event) => setMonth(event.target.value)} >
            {months.map((month, index) => {
              return <option key={index.month}>{month}</option>
            })}
          </select>
          <Link to='/cashflowform'><button type="button" className="btn btn-dark btn-sm">Add New Cashlow</button></Link>
        </div>
      </div>
      {!RenderInfo &&
        <div className="container">
          <div className="jumbotron jumbotron-fluid">
            <h2 className="display-6">Seems you are missing some information?</h2>
            {month === "Please Select" ? "Please select a month, or simple click above to add information for any given month." : `It seems you have not entered any information for the month of: ${month}`}
          </div>
        </div>}
      {RenderInfo &&
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Income</h5>
                  <p className="card-text">${numberWithCommas(IncomeSum.reduce((a, b) => a + b))}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Expenses</h5>
                  <p className="card-text">${numberWithCommas(expenseSum.reduce((a, b) => a + b))}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Monthly Balance</h5>
                  <p className="card-text">${numberWithCommas(IncomeSum.reduce((a, b) => a + b) - expenseSum.reduce((a, b) => a + b))}</p>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <Chart doughnutData={doughnut} barChartData={bar} pieChartData={pie} />
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
                  <td>${numberWithCommas(incomes.primaryIncome)}</td>
                  <td>${numberWithCommas(incomes.investmentIncome)}</td>
                  <td>${numberWithCommas(incomes.otherIncome)}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Expense Name</th>
                  <th scope="col">Expense Category</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => {
                  return (<tr>
                    <td key={index.name}>{expense.name}</td>
                    <td key={index.category}>{expense.category}</td>
                    <td key={index.amount}>${numberWithCommas(expense.amount)}</td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>}
    </React.Fragment>
  )
}