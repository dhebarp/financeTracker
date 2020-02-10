import React from 'react';

class Income extends React.Component{

render() {
    return (
<React.Fragment>
            <div className="form-group row">
                <label for="exampleFormControlInput1">Primary Income</label>
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
}

export default Income;