import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/dashboard"} component={Dashboard} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
