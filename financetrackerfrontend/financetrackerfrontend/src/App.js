import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import {Auth} from './components/Auth';

export function App() {

  // if(!loginState){
  //   renderForm();
  // } else {
  //   renderLoggedIn()
  // }

  return (
    <div className="App">
      <Navbar />
      <Auth/>
      <Route exact path={"/"} component={Home} />
      <Route exact path={"/dashboard"} component={Dashboard} />
      <Footer />
    </div>
  );
}

export default App;
