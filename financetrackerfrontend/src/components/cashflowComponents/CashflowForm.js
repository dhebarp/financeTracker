import React from 'react';
import { months, categories } from './CashFlowCategories';
export class CashflowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: "",
            showIncome: false,
            showExpense: false,
            incomes: {},
            expenses: [],
            id: Math.floor(Math.random() * 100000000),
            expenseName: '',
            category: '',
            expenseAmount: '',
        }
    }

    /// HandleSubmit Here
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);

        this.createNewCashflow();

    }

    //this works but data is sent in a string.
    createNewCashflow = () => {

        fetch("cashflow/new", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify({
                month: this.state.month,
                incomes: {
                    primaryIncome: +this.state.incomes.primaryIncome,
                    investmentIncome: +this.state.incomes.investmentIncome,
                    otherIncome: +this.state.incomes.otherIncome
                },
                expenses: this.state.expenses
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log("data:", data);
            })
    }

    // render income when button pressed
    handleChange = (event, i) => {
        event.preventDefault();
        // console.log('you clicked submit');
        const name = event.target.name;
        const value = event.target.value;
        if (name === "month") {
            this.setState({
                month: value
            })
        } else if (name === "primaryIncome") {
            this.setState({
                incomes: { ...this.state.incomes, primaryIncome: value }
            })
        } else if (name === "investmentIncome") {
            this.setState({
                incomes: { ...this.state.incomes, investmentIncome: value }
            })
        } else if (name === "otherIncome") {
            this.setState({
                incomes: { ...this.state.incomes, otherIncome: value }
            })
        } else {
            this.setState({ [name]: value });
        }
    };
    toggleIncome = (event) => {
        event.preventDefault();
        this.setState((state, props) => ({
            showIncome: !state.showIncome
        })
        )
    }
    renderAddForm() {
        return (
            <React.Fragment>
                <div className="form-group row">
                    <label htmlFor="exampleFormControlInput1">Primary Income (per month):</label>
                    <input value={this.state.incomes.primaryIncome} name="primaryIncome" type="number" className="form-control" onChange={this.handleChange} />
                </div>
                <div className="form-group row">
                    <label htmlFor="exampleFormControlInput1">Investment Income/Dividends</label>
                    <input value={this.state.investmentIncome} name="investmentIncome" type="number" className="form-control" onChange={this.handleChange} />
                </div>
                <div className="form-group row">
                    <label htmlFor="exampleFormControlInput1">Other Income</label>
                    <input value={this.state.otherIncome} name="otherIncome" type="number" className="form-control" onChange={this.handleChange} />
                </div>
                <hr />
            </React.Fragment>
        )
    }

    monthDropDown() {
        return months.map(month => {
            return <option>{month}</option>;
        })
    }
    categoryDropDown() {
        return categories.map(category => {
            return <option>{category}</option>;
        })
    }

    toggleExpense = (event) => {
        event.preventDefault();
        this.setState((state, props) => ({
            showExpense: !state.showExpense
        })
        )
    }

    addExpense = (event) => {
        event.preventDefault();
        const newExpense = [...this.state.expenses]
        newExpense.push({ id: this.state.id, name: this.state.expenseName, category: this.state.category, amount: this.state.expenseAmount })
        this.setState({
            expenses: newExpense,
            showExpense: false,
            id: Math.floor(Math.random() * 100000000), 
            expenseName: '',
            category: '',
            expenseAmount: '',
        })
    }

    deleteExpense = (deleteIndex) => {
       const allexpenses = this.state.expenses;

        allexpenses.splice(deleteIndex, 1);
        this.setState({expenses: allexpenses});
    }

    //finish logic fo this with state and props.
    renderExpenseForm(index) {
        return (
            <>
                <input key={index} value={this.state.id} name="expenseName" type="hidden" className="form-control" onChange={this.handleChange} />
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Expense Name:</label>
                    <input key={index} value={this.state.expenseName} name="expenseName" type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name of Expense" onChange={this.handleChange} />
                    {/* (event) => this.handleExpenseChange(event.currentTarget.name, event.currentTarget.value, index) */}
                </div>
                <div class="form-group row">
                    <label for="exampleFormControlSelect1">Category</label>
                    <select key={index} value={this.state.category} name="category" class="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                        {this.categoryDropDown()}
                    </select>
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Expense Amount:</label>
                    <input key={index} value={this.state.expenseAmount} name="expenseAmount" type="number" className="form-control" id="exampleFormControlInput1" placeholder="Amount" onChange={this.handleChange} />
                </div>
            </>
        )
    }

    render() {
        return (
            <div className="col-8">
                <div className="jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <button class="btn btn-primary mb-2" onClick={this.toggleIncome}>Add Income</button>
                        <button class="btn btn-info mb-2" onClick={this.toggleExpense}>Add New Expense</button>
                        <div class="form-group row">
                            <label for="exampleFormControlSelect1">Months</label>
                            <select name="month" class="form-control" onChange={this.handleChange} >
                                {this.monthDropDown()}
                            </select>
                        </div>
                        {this.state.showIncome && this.renderAddForm()}
                        {this.state.expenses.map((expense, index) => {
                            return (<div key={index}>
                                <div class="form-row">
                                    <div class="col">
                                        <input value={expense.name} type="text" className="form-control" readonly="true" />
                                    </div>
                                    <div class="col">
                                        <input value={expense.category} type="text" className="form-control" readonly="true" />
                                    </div>
                                    <div class="col">
                                        <input value={expense.amount} type="number" className="form-control" readonly="true" />
                                    </div>
                                </div>
                                <br />
                                <button class="btn btn-danger mb-2" onClick={() => this.deleteExpense(index)}>Delete Expense</button>
                            </div>
                            )
                        })}
                        {this.state.showExpense && this.renderExpenseForm()}
                        <hr/>
                        <button className="btn btn-primary mb-2" onClick={this.addExpense}>Save Expense</button>
                        <button type="submit" className="btn btn-success mb-2" onClick={this.handleSubmit}>Save Month</button>
                    </form>
                </div>
            </div>
        )
    }
}