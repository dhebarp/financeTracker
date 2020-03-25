import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState'
import {Navbar} from './components/Navbar';
  // eslint-disable-next-line
import {SideNavBar} from './components/sideBarNav';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import {Auth} from './components/Auth';
import {Signup} from './components/Signup';
import {CashflowManager} from './components/cashflowComponents/CashflowManager';
import {CashflowForm} from './components/cashflowComponents/CashflowForm';
import { MortgageManager } from './components/mortgageComponents/MortgageManager';

// import {SideNavBar} from './components/sideBarNav';



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
          if(response.status === 200)
          {
            setUserLoggedIn(true);
          }
      }).catch(error => console.log('error', error));
  }

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const renderPrivateRoutes = () => 
  {
    return (        
    <>
      <Route exact path={"/mortgage"} component={MortgageManager} />
      <Route exact path={"/cashflow"} component={CashflowManager} />
      <Route exact path={"/cashflowform"} component={CashflowForm} />
      <Route path="*" component={() => "404 Not Found"} />
    </>
    )
  }
  
  return (
    <div className="App">
      <GlobalProvider>
      <Navbar />
      {/* <SideNavBar/> */}
      <Switch>
      <Route exact path={"/"} component={Home} />
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
