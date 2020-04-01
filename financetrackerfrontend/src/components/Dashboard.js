import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { calculatePayments } from './mortgageComponents/MortgageData'
// eslint-disable-next-line
import { numberWithCommas } from '/Users/paritoshdhebar/Documents/ga_sei_projects/unit4_project/financetrackerfrontend/src/utils/format';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// eslint-disable-next-line
import Button from 'react-bootstrap/Button'
import { categories } from './cashflowComponents/CashFlowCategories';
import { Line, Doughnut } from 'react-chartjs-2'

export const Dashboard = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [cashflow, setCashflow] = useState([]);
    const [month, setMonth] = useState("Please Select");
    const [name, setName] = useState('');
    const [mortgage, setMortgage] = useState([])
    const { payments } = calculatePayments(principal, rate, years);
    const [expenses, setExpenses] = useState([])
    const [expenseAmounts, setexpenseAmounts] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {

        getCashflows();
        getMortgages();

    }, [])

    const getCashflows = () => {

        fetch("/cashflow/view",
            {
                method: "GET",
                credentials: "same-origin",
            })
            .then(async data => {
                const cashflowData = await data.json();
                setCashflow(cashflowData.data);
            }).catch(err => {
                console.log(err);
            })
    }

    const getMortgages = () => {

        fetch("/mortgage/view",
            {
                method: "GET",
                credentials: "same-origin",
            })
            .then(async data => {
                const mortgageData = await data.json();
                setMortgage(mortgageData);
            }).catch(err => {
                console.log(err);
            })
    }

    const viewCashflow = (month) => {

        const selectedMonth = cashflow.filter(cash => cash.month === month)

        const mappedCategories = categories.map(cat => {
            return { category: cat, amount: 0 }
        })
        setExpenses(selectedMonth[0].expenses);
        const expenseData = selectedMonth[0].expenses // need to refactor this
        const result = expenseData.reduce((accumulator, currentValue) => {
            //find the index of the category
            const indx = accumulator.findIndex((cat) => cat.category === currentValue.category);

            //update the amount for this category
            accumulator[indx].amount += currentValue.amount;

            //return the accumulator for the next iteration
            return accumulator
        }, mappedCategories);

        const resultNoZeroes = result.filter(cat => cat.amount > 0);

        const updatedExpenses = resultNoZeroes.map(a => a.amount);
        const updatedCategoryList = resultNoZeroes.map(a => a.category);
        setexpenseAmounts(updatedExpenses);
        setCategory(updatedCategoryList);
    }

    const viewMortgage = (name) => {

        const onePlan = mortgage.filter(plan => plan.planName === name)
        setPrincipal(onePlan[0].loanAmount);
        setRate(onePlan[0].interestRate);
        setYears(onePlan[0].loanDuration);
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

    const doughnutData = {
        data: {
            labels: category,
            datasets: [{
                data: expenseAmounts,
                backgroundColor: ['rgba(115, 24, 111, 0.9)', 'rgba(37, 42, 17, 0.6)', 'rgba(182, 158, 125, 0.8)', 'rgba(183, 164, 179, 0.8)', 'rgba(137, 105, 111, 0.6)', 'rgba(22, 128, 92, 0.5)', 'rgba(253, 69, 43, 0.5', 'rgba(113, 200, 49, 0.8)', 'rgba(253, 149, 36, 0.8)', 'rgba(145, 232, 131, 0.7)', 'rgba(5, 214, 225, 1)']
            }]
        }
    }

    return (
        <div>
            <br />
            <Container>
                <Row>
                    <Col>
                        <Card xs={6}>
                            <Card.Header as="h5">Monthly Cashflow</Card.Header>
                            <Card.Body>
                            </Card.Body>
                            <div className="container">
                                <div className="input-group input-group-sm mb-3">
                                    <select className="custom-select" value={month} onChange={e => {
                                        setMonth(e.target.value); viewCashflow(e.target.value)
                                    }}>
                                        <option selected>Please Select</option>
                                        {cashflow.map((cash, id) => {
                                            return <option key={id}>{cash.month}</option>
                                        })}
                                    </select>
                                </div>
                                <Doughnut data={doughnutData.data} />
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card xs={6}>
                            <Card.Header as="h5">Mortgage</Card.Header>
                            <Card.Body>
                            </Card.Body>
                            <div className="container">
                                <div className="input-group input-group-sm mb-3">
                                    <select className="custom-select" value={name} onChange={e => {
                                        setName(e.target.value); viewMortgage(e.target.value);
                                    }}>
                                        <option selected>Please Select</option>
                                        {mortgage.map((plan, id) => {
                                            return <option key={id}>{plan.planName}</option>
                                        })}
                                    </select>
                                </div>
                                <Line data={linedata.data} />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Card >
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Expense Name</th>
                                    <th>Expense Category</th>
                                    <th>Expense Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense, index) => {
                                    return (<tr>
                                        <td key={index.name}>{expense.name}</td>
                                        <td key={index.category}>{expense.category}</td>
                                        <td key={index.expenseAmount}>${numberWithCommas(expense.amount)}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
