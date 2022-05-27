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
import GetCabania from './GetCabania';

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
    this.setState({adminUser: service.isAdminUser()});
    // this.applyWidthUser();
  }

  logout() {
    service.logout();
    this.setState({ isLoggedIn: service.isUserLoged() });
    this.setState({adminUser: service.isAdminUser()});
  }

  // applyWidthUser(){
  //     let navBarWidth = document.getElementById("navBar").offsetWidth;
  //     console.log(navBarWidth);

  //     let user = document.getElementById("User");
  //     var newWidth = navBarWidth - (navBarWidth * 0.3);
  //     user.style.setProperty('margin-left', `${newWidth}px`);
  // }

  render() {
    return (
      <Router>
        <div id="navBar" className="nav-wrapper black navWrapperHeight">
          <ul className="left hide-on-med-and-down">
            <li className='style'>
              <Link to="/">Home</Link>
            </li>
            {
              this.state.isLoggedIn && this.state.adminUser && <li>
                <Link to="/abmCabanias">Abm Cabanias</Link>
              </li>
            }
            {
              this.state.isLoggedIn && <li>
              <Link to="/favorites">Favorites</Link>
            </li>}
            {
              !this.state.isLoggedIn && <li>
              <Link to="/login">Login</Link>
            </li>}
            {
              this.state.isLoggedIn && <li id="User">
                <a href='/' onClick={this.logout}>Logout</a>
              </li>
            }

          </ul>
        </div>

        
        <Routes>
          <Route path='/' element={<CabaniasList />} />
          {
            this.state.isLoggedIn && this.state.adminUser && <Route path="/abmCabanias" element={<ABMCabanias />} />
          }
          {
            !this.state.isLoggedIn && <Route path='/login' element={<Login />} />
          }
          <Route path="getCabania/:id" element={<GetCabania />} />
          
        </Routes>
      </Router>

    )
  }
}

export default AppCabania;