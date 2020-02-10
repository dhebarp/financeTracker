import React from 'react';
import { months, categories } from './CashFlowCategories';

export class CashflowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: "",
            showIncome: false,
            incomes: {
                primaryIncome: 0,
                investmentIncome: 0,
                otherIncome: 0,
            },
            expenses: []
        }
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
        // } else if (name === "") {
        //     this.setState({SCAnswer: event.target.value});
        //     const expenseGroup = this.state.;
        //     SCAnswerGroup[i] = event.target.value;
        //     this.setState({SCAnswerGroup});
        } else {
            console.log('dataset', event.dataset)
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
                    <label for="exampleFormControlInput1">Primary Income (per month):</label>
                    <input value={this.state.primaryIncome} name="primaryIncome" type="number" className="form-control" onChange={this.handleChange} />
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Investment Income/Dividends</label>
                    <input value={this.state.investmentIncome} name="investmentIncome" type="number" className="form-control"  onChange={this.handleChange} />
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Other Income</label>
                    <input value={this.state.otherIncome} name="otherIncome" type="number" className="form-control" onChange={this.handleChange} />
                </div>
                <hr />
            </React.Fragment>
        )
    }

    


    addExpense = (event) => {
        event.preventDefault();
        const newExpense = [...this.state.expenses]
        newExpense.push({ expenseName: this.state.expenseName, category: this.state.category, expenseAmount: this.state.expenseAmount})
        this.setState({
            expenses: newExpense
        })
    }

    //finish logic fo this with state and props.
    renderExpenses = (index) => {
        return (
            <React.Fragment>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Expense Name:</label>
                    <input name="expenseName" key={index} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name of Expense" onChange={this.handleChange} />
                    {/* (event) => this.handleExpenseChange(event.currentTarget.name, event.currentTarget.value, index) */}
                </div>
                <div class="form-group row">
                    <label for="exampleFormControlSelect1">Category</label>
                    <select name="category" key={index} class="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                        {this.categoryDropDown()}
                    </select>
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Expense Amount:</label>
                    <input name="expenseAmount" key={index} type="number" className="form-control" id="exampleFormControlInput1" placeholder="Amount" onChange={this.handleChange} />
                </div>
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

    render() {
        return (
            <div className="col-8">
                <div className="jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group row">
                            <label for="exampleFormControlSelect1">Months</label>
                            <select name="month" class="form-control" onChange={this.handleChange} >
                                {this.monthDropDown()}
                            </select>
                        </div>
                        {this.state.showIncome && this.renderAddForm()}
                        {this.state.expenses.map((expense, index) => {
                            return <div key={index}>{this.renderExpenses(expense, index)}</div>
                        })}
                        <button class="btn btn-primary mb-2" onClick={this.toggleIncome}>Add Income</button>
                        <button class="btn btn-primary mb-2" onClick={this.addExpense}>Add Expense</button>
                    </form>
                </div>
            </div>
        )
    }
}