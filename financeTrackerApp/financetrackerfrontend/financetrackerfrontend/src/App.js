import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import {Auth} from './components/Auth';
import {Signup} from './components/Signup';
import {CashflowManager} from './components/cashflowComponents/CashflowManager';
import {CashflowForm} from './components/cashflowComponents/CashflowForm';

// import {SideNavBar} from './components/sideBarNav';

export function App() {
  
  return (
    <div className="App">
      <Navbar />
      {/* <SideNavBar/> */}
      <Switch>
      <Route exact path={"/"} component={Home} />
      <Route exact path={"/dashboard"} component={Dashboard} />
      <Route exact path={"/auth"} component={Auth} />
      <Route exact path={"/signup"} component={Signup} />
      <Route exact path={"/cashflow"} component={CashflowManager} />
      <Route exact path={"/cashflowform"} component={CashflowForm} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
