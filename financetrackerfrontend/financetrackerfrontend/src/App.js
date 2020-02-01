import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import {Auth} from './components/Auth';
import {Signup} from './components/Signup';

export function App() {

  // if(!loginState){
  //   renderForm();
  // } else {
  //   renderLoggedIn()
  // }

  return (
    <div className="App">
      <Navbar />
      <Route exact path={"/"} component={Home} />
      <Route exact path={"/dashboard"} component={Dashboard} />
      <Route exact path={"/auth"} component={Auth} />
      <Route exact path={"/signup"} component={Signup} />
      <Footer />
    </div>
  );
}

export default App;
