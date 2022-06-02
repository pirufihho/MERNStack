import React, { useRef, useState,useEffect, Fragment,useReducer } from 'react';
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

function Favorites() {
  const ref = useRef(null);
  const [userId, setUserId] = useState(service.getUserId);
  const [favorites,setFavorites]=useState([]);
  const [cabanias,setCabanias]=useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  

  useEffect(() => {
    getFavorites();
    }, [])

    function getFavorites(){
        fetch('/api/favorites/byId/' + userId)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            setFavorites(data);
            getCabanias(data);
        });
    }

    function getCabanias(fav){
        let tempCabanias = [];
        if(fav){
            // fav.forEach(f => {
            // fetch('/api/cabanias/' + f.cabaniaId)
            //     .then(res => res.json())
            //     .then(data => {
            //         tempCabanias.push(data);
            //         //setCabanias(tempCabanias);
            //     }); 
            // })
            for(const item of fav){
                           fetch('/api/cabanias/' + item.cabaniaId)
                .then(res => res.json())
                .then(data => {
                    tempCabanias.push(data);
                    setCabanias(tempCabanias);
                    forceUpdate();
                }); 
            }

        }
    }


  return (
    <Fragment>
    <h2>Favorites List</h2>
    
    {
        cabanias.map(c => {
            return (<div key={c._id}>
                {c.title}
            </div>) 
        })
    }
    </Fragment>
  )
}

export default Favorites;