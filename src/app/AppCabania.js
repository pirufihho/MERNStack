import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import ABMCabanias from './ABMCabanias';
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
            <div className="nav-wrapper" style={{ height: '80px' }}>
              <ul className="left hide-on-med-and-down">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/abmCabanias">Abm Cabanias</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              </ul>
              </div>
      
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
                <Route path="/abmCabanias" element={<ABMCabanias/>} />
                {/* <Route path="/dashboard">
                  <Dashboard />
                </Route> */}
              </Routes>
          </Router>
              
        )
    }
}

export default AppCabania;