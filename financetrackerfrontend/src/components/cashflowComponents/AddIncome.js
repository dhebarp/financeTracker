import React from 'react'

export const AddIncome = (props) => {

const handleChange = event => {
    event.preventDefault();

    const value = event.target.value

}


    return (
        <>
        <form>
                 <div className="form-group row">
                    <label for="exampleFormControlInput1">Primary Income (per month):</label>
                    <input value={props.primaryIncome} name="primaryIncome" type="number" className="form-control" onChange={handleChange} />
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Investment Income/Dividends</label>
                    <input value={props.investmentIncome} name="investmentIncome" type="number" className="form-control" onChange={handleChange} />
                </div>
                <div className="form-group row">
                    <label for="exampleFormControlInput1">Other Income</label>
                    <input value={props.otherIncome} name="otherIncome" type="number" className="form-control" onChange={handleChange}  />
                </div>
                <hr />  
                </form>
        </>
    )
}
