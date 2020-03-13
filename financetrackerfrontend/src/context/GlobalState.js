import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { months } from '../components/cashflowComponents/CashFlowCategories';

//initial State
const initialState = {
    incomes: {},
    expenses: [],
    month: "Please Select",
    error: null,
    loading: true
}

//Create Context
export const GlobalContext = createContext(initialState);

//Provider comp
export const GlobalProvider = ({ children }) => { // all components in App will becomes these children?
    const [state, dispatch] = useReducer(AppReducer, initialState); //dispatch is used whenever reducer is called?

    //Actions to reducer
    async function getCashflow(month) {
        try {
     const res  = await fetch(`/cashflow/view/${month}`,
            {
              method: "GET",
              credentials: "same-origin",
            })
          dispatch({
            type: 'GET_CASHFLOW',
            payload: res.data
          })    
        } catch (err) {
            console.log(err);
        }
      }


    return (<GlobalContext.Provider value={{
        incomes: state.incomes,
        expenses: state.expenses,
        month: months,
        error: state.error,
        getCashflow
    }}>
        {children}
    </GlobalContext.Provider>);
}