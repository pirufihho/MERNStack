import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";

//function wrapper to retrive params from uri
// function withParams(Component) {
//     return props => <Component {...props} params={useParams()} />;
// }

function RenderCabania(props) {
        return(
            <Fragment>
            <div className='container'>
            <div className='row'>
                <div className='col s-6'>
                    <div className='card'>
                        <div className='card-content' >
                            <div className='row'>
                                <h4>{props.cabania.title}</h4>
                            </div>
                            <div className='row'>
                                {props.cabania.description}
                            </div>
                            {
                                props.cabania.imgURI != "" && <div className='row'>
                                    <img  src={props.cabania.imgURI} alt={props.cabania.title} />
                                </div>
                            }
                            <div className='row'>
                                Phone Number: <b>{props.cabania.phone}</b> 
                            </div>
                            <div className='row'>
                                E-Mail: <b>{props.cabania.mail}</b> 
                            </div>
                            <div className='row'>
                                <a href={'https://wa.me/'+props.phone} className='btn light-blue darken-4' >
                                                    <i className='material-icons'>call
                                                    </i>
                                </a>

                                <a className='btn light-blue darken-4 marginLeft' href={'mailto:'+props.mail}>
                                    <i className='material-icons'>mail
                                                    </i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
        )
    }

export default RenderCabania;