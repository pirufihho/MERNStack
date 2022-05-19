import React, { Component } from 'react';
import service from '../services/user.service';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ABMCabanias from './ABMCabanias';
import CabaniasList from './CabaniasList';
import Login from './login'

class AppCabania extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoggedIn: service.isUserLoged() });
  }

  logout() {
    service.logout();
    this.setState({ isLoggedIn: service.isUserLoged() })
  }

  render() {
    return (
      <Router>
        <div className="nav-wrapper" style={{ height: '80px' }}>
          <ul className="left hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
            {
              this.state.isLoggedIn && <li>
                <Link to="/abmCabanias">Abm Cabanias</Link>
              </li>
            }
            {
              this.state.isLoggedIn && <li>
              <Link to="/admin">Admin</Link>
            </li>}
            {
              !this.state.isLoggedIn && <li>
              <Link to="/login">Login</Link>
            </li>}
            {
              this.state.isLoggedIn && <li>
                <a href='/' onClick={this.logout}>Logout</a>
              </li>
            }

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
          <Route path='/' element={<CabaniasList />} />
          {
            this.state.isLoggedIn && <Route path="/abmCabanias" element={<ABMCabanias />} />
          }
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>

    )
  }
}

export default AppCabania;