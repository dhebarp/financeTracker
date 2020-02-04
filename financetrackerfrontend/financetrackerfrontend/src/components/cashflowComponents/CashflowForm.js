import React from 'react';
// import {ShowInputLists} from './CashFlowCategories';

export class CashflowForm extends React.Component {
    constructor(props){
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
    )}
        
        renderAddForm() {
            return(
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
            </React.Fragment>
            )
        }

            // addExpense(){
        //     this.setState((state, props) => ({
        //         expenses: state.expenses.push({ExpenseObj})
        // }));
        // }
        // function renderExpenses()
        // {
        //     this.expenses.map(expenses => {
        //         return <Expense />
        //     }
        // }
        // {renderExpenses()}
        // {this.state.showIncome && renderAddForm()}


    render() {
        return (
            <div className="col-8">
                <div className="jumbotron">
                    <form>
                        <div class="form-group row">
                            <label for="exampleFormControlInput1">Email address</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div class="form-group row">
                            <label for="exampleFormControlSelect1">Months</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option></option>
                            </select>
                        </div>
                        {this.state.showIncome && this.renderAddForm()}
                        <button class="btn btn-primary mb-2" onClick={this.toggleIncome}>Add Income</button>
                        <button class="btn btn-primary mb-2" onClick={this.addExpenseRender}>Add Expense</button>
                    </form>
                </div>
            </div>
        )
    }
}