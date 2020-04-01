import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState'
import { Navbar } from './components/Navbar';
import { SideNavBar } from './components/sideBarNav';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { Signup } from './components/Signup';
import { CashflowManager } from './components/cashflowComponents/CashflowManager';
import { CashflowForm } from './components/cashflowComponents/CashflowForm';
import { MortgageManager } from './components/mortgageComponents/MortgageManager';
import { Dashboard } from './components/Dashboard';

export function App() {

  useEffect(() => {
    //ask the backend if we are logged in
    checkLoginStatus();
  }, [])

  const checkLoginStatus = () => {

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      credentials: "same-origin"
    };

    fetch("/auth/checkUser", requestOptions)
      .then(response => {
        if (response.status === 200) {
          setUserLoggedIn(true);
        }
      }).catch(error => console.log('error', error));
  }

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const renderPrivateRoutes = () => {
    return (
      <>
        <SideNavBar />
        <Route exact path={"/login"} component={Auth} />
        <Route exact path={"/dashboard"} component={Dashboard} />
        <Route exact path={"/mortgage"} component={MortgageManager} />
        <Route exact path={"/cashflow"} component={CashflowManager} />
        <Route exact path={"/cashflowform"} component={CashflowForm} />
      </>
    )
  }

  return (
    <div className="App">
      <GlobalProvider>
        <Navbar />
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/login"} component={Auth} />
          <Route exact path={"/signup"} component={Signup} />
          {isUserLoggedIn && renderPrivateRoutes()}
        </Switch>
        <Footer />
      </GlobalProvider>
    </div>
  );
}

export default App;
