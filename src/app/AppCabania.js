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
import Login from './Login'
import GetCabania from './GetCabania';
import Favorites from './Favorites';
import CreateAccount from './CreateAccount';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AppCabania() {
  const ref = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(service.isUserLoged());
  const [adminUser, setAdminUser] = useState(service.isAdminUser());
  const [toggleProfile, setToggleProfile] = useState(false);
  const [userName, setUserName] = useState(service.getUserName());

  useEffect(() => {
    console.log('appcabania.js');
    if (ref.current) {
      applyWidthUser(ref.current);
    }
  }, []);

  function applyWidthUser(ref) {
    let navBarWidth = document.getElementById("navBar").offsetWidth;

    //set margin of profile and login buttons
    if(ref.id=="profile"){
      ref.style.setProperty('margin-left', `${navBarWidth - (navBarWidth * 0.2)}px`);
    } else{
      ref.style.setProperty('margin-left', `${navBarWidth - (navBarWidth * 0.1)}px`);
    }
    
  }

  function logout() {
    service.logout();
    setLoggedIn(service.isUserLoged());
    setAdminUser(service.isAdminUser());
    window.location.reload();
    _toggleProfile();
  }

  function _toggleProfile(){
    setToggleProfile(!toggleProfile);
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
            !isLoggedIn && <li id="login" ref={ref}>
              <Link to="/login">Login</Link>
            </li>
          }
          {
            isLoggedIn && <li id="profile" ref={ref}>
                <a className="btn dropdown-trigger light-blue darken-4" href="#" data-target="dropdown2" onClick={() => setToggleProfile(!toggleProfile)}> <AccountCircleIcon />{userName}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
                
                 {toggleProfile && <a className="btn dropdown-trigger light-blue darken-4 profileOption" href="#" onClick={() =>logout()}>Logout</a>}
                 {toggleProfile && <Link className="btn dropdown-trigger light-blue darken-4 profileOption" to='/favorites' onClick={()=>_toggleProfile()}>Favorites</Link>}
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
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="getCabania/:id" element={<GetCabania />} />

      </Routes>
    </Router>

  )
}

export default AppCabania;