import React, { useState }from 'react';
import {categories } from './CashFlowCategories';
import Chart from './CashflowExpensesChart';

export function CashflowManager() {

    const [incomes, setIncomes] = useState({});
    const [expenses, setexpenses] = useState([]);
    const [category] = useState(categories.slice(1,11));
    
    const [chartData, setChartData] = useState({
        labels: category, //labels need to match data
        datasets: [{
          data: expenses,
          backgroundColor: [
          'rgba(115, 24, 111, 0.9)',
          'rgba(37, 42, 17, 0.6)',
          'rgba(182, 158, 125, 0.8)',
          'rgba(183, 164, 179, 0.8)',
          'rgba(137, 105, 111, 0.6)',  
          'rgba(22, 128, 92, 0.5)',  
          'rgba(253, 69, 43, 0.5',  
          'rgba(113, 200, 49, 0.8)',  
          'rgba(253, 149, 36, 0.8)',          
        ]
        }]
      })
    
      
    return (
        <React.Fragment>
            <Chart chartData={chartData}/>
        </React.Fragment>
    )
}