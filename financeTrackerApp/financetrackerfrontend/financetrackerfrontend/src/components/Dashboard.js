import React from 'react';
import { MortgageManager } from './mortgageComponents/MortgageManager';

export function Dashboard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    Cashflow Manager here
                </div>
                <div className="col">
                    Asset Manager Here
                </div>
                <div className="col">
                    <MortgageManager/>
                </div>
            </div>
        </div>
    )
}