import React, { Component, useRef, useEffect, useState } from 'react';
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
import Favorites from './Favorites';

function AppCabania() {
  const ref = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(service.isUserLoged());
  const [adminUser, setAdminUser] = useState(service.isAdminUser());

  useEffect(() => {
    if (ref.current) {
      applyWidthUser(ref.current);
    }
  }, []);

  function applyWidthUser(ref) {
    let navBarWidth = document.getElementById("navBar").offsetWidth;
    ref.style.setProperty('margin-left', `${navBarWidth - (navBarWidth * 0.3)}px`);
  }

  function logout() {
    service.logout();
    setLoggedIn(service.isUserLoged());
    setAdminUser(service.isAdminUser());
  }

  return (
    <Router>
      <div id="navBar" className="nav-wrapper black navWrapperHeight">
        <ul className="left hide-on-med-and-down">
          <li className='style'>
            <Link to="/">Home</Link>
          </li>
          {
            isLoggedIn && adminUser && <li>
              <Link to="/abmCabanias">Abm Cabanias</Link>
            </li>
          }
          {
            isLoggedIn && <li>
              <Link to="/favorites">Favorites</Link>
            </li>}
          {
            !isLoggedIn && <li>
              <Link to="/login">Login</Link>
            </li>
          }
          {
            isLoggedIn && <li>
                <a className="btn dropdown-trigger" href="#" data-target="dropdown2">Profile
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
                
                  <a className="btn dropdown-trigger profileOption" href="#" onClick={() =>logout()}>Logout</a>
                
              </li>

          }
        </ul>
      </div>


      <Routes>
        <Route path='/' element={<CabaniasList />} />
        {
          isLoggedIn && adminUser && <Route path="/abmCabanias" element={<ABMCabanias />} />
        }
        {
          !isLoggedIn && <Route path='/login' element={<Login />} />
        }
        {
          isLoggedIn && <Route path='/favorites' element={<Favorites />} />
        }
        <Route path="getCabania/:id" element={<GetCabania />} />

      </Routes>
    </Router>

  )
}

export default AppCabania;