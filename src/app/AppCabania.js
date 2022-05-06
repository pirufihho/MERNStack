import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import CabaniasList from './CabaniasList';

class AppCabania extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">Abm Cabanias</Link>
                </li>
                <li>
                  <Link to="/dashboard">Admin</Link>
                </li>
              </ul>
      
              <hr />
      
              {/*
                A <Switch> looks through all its children <Route>
                elements and renders the first one whose path
                matches the current URL. Use a <Switch> any time
                you have multiple routes, but you want only one
                of them to render at a time
              */}
              <Routes>
              <Route path='/' element={<CabaniasList/>} />
                {/* <Route path="/about">
                  <About />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route> */}
              </Routes>
            </div>
          </Router>
              
        )
    }
}

export default AppCabania;