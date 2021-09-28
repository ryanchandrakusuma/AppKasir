import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Reports from './Pages/Reports';
import Manage from './Pages/Manage';
import Team from './Pages/Team';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/manage' exact component={Manage} />
          <Route path='/reports' component={Reports} />
          <Route path='/team' component={Team} />
      </Switch>
    </Router>
    
  );
}

export default App;
