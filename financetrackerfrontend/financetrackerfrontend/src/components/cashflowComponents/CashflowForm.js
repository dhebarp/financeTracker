import React from 'react';
import {months, categories} from './CashFlowCategories';

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
            expenses: [{
                expenseName: "",
                category: "",
                expenseAmount: 0,
            }]
        }
    }
    // render income when button pressed

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
                    <label for="exampleFormControlInput1">Primary Income (per annum):</label>
                    <input defaultValue={this.props.primaryIncome} type="text" className="form-control" id="exampleFormControlInput1" placeholder="50000" />
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Investment Income/Dividends</label>
                    <input defaultValue={this.props.investmentIncome} type="text" className="form-control" id="exampleFormControlInput1" placeholder="1000" />
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Other Income</label>
                    <input defaultValue={this.props.otherIncome} type="text" className="form-control" id="exampleFormControlInput1" placeholder="500" />
                </div>
                <hr />
            </React.Fragment>
        )
    }


    addExpense() {
        this.setState((state, props) => ({
            expenses: state.expenses.push({
                expenseName: this.setState(),
                category: "",
                expenseAmount: 0,
            })
        }));
    }

    //add category logic here - similar to months array.

    //finish logic fo this with state and props.
        renderExpenses = (expenses) => {
    this.expenses.map(expenses => {
    return(
        <React.Fragment>
            <div className="form-group row">
                <label for="exampleFormControlInput1">Expense Name:</label>
                <input defaultValue={this.props.primaryIncome} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="form-group row">
                <label for="exampleFormControlInput1">Investment Income/Dividends</label>
                <input defaultValue={this.props.investmentIncome} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="form-group row">
                <label for="exampleFormControlInput1">Other Income</label>
                <input defaultValue={this.props.otherIncome} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            </React.Fragment>
    )
            }
    )}

    monthDropDown() {
        return months.map(month => {
        return <option>{month}</option>;
        })
    }

        render() {
            return (
                <div className="col-8">
                    <div className="jumbotron">
                        <form>
                            <div class="form-group row">
                                <label for="exampleFormControlSelect1">Months</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                {this.monthDropDown()}
                                </select>
                            </div>
                            {this.state.showIncome && this.renderAddForm()}
                            {/* {renderExpenses()} */}
                            <button class="btn btn-primary mb-2" onClick={this.toggleIncome}>Add Income</button>
                            <button class="btn btn-primary mb-2" onClick={this.addExpenseRender}>Add Expense</button>
                        </form>
                    </div>
                </div>
            )
        }
    }