import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm'; // Import the RegistrationForm component
import './styles/App.css';
import Home from './pages/Home';
import Remove from './pages/remove';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RegistrationForm} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/remove" component={Remove} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
