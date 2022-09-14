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

function mailTo(mail) {
    return 'mailto:' + mail
}

function whatsapp(wh) {
    return 'https://wa.me/' + wh
}



function RenderCabania(props) {
    return (
        <Fragment>
            <div className='container'>
                <div className='row'>
                    <div className='col s-6'>
                        <div className='card'>
                            <div className='card-content' >
                                <div className='row'>
                                    <div className='col s-10'>
                                        <h4>{props.cabania.title}</h4>
                                    </div>
                                    {props.showDelete && <div className='col s-2'>
                                        <button className='btn light-blue darken-4' onClick={() => props.deleteFavorite(props.cabania)}>
                                            <i className='material-icons'>delete
                                            </i>
                                        </button>
                                    </div>}
                                </div>
                                <div className='row'>
                                    Province: <b>{props.cabania.province}</b>
                                </div>
                                <div className='row'>
                                    City: <b>{props.cabania.city}</b>
                                </div>
                                <div className='row'>
                                    {props.cabania.description}
                                </div>
                                {
                                    props.cabania.imgURI != "" && <div className='row'>
                                        <img src={props.cabania.imgURI} alt={props.cabania.title} />
                                    </div>
                                }
                                <div className='row'>
                                    Phone Number: <b>{props.cabania.phone}</b>
                                </div>
                                <div className='row'>
                                    E-Mail: <b>{props.cabania.mail}</b>
                                </div>
                                <div className='row'>
                                    <a href={whatsapp(props.cabania.phone)} className='btn light-blue darken-4' >
                                        <i className='material-icons'>call
                                        </i>
                                    </a>

                                    <a className='btn light-blue darken-4 marginLeft' href={mailTo(props.cabania.mail)}>
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