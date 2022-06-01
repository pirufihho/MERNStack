import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import service from '../services/user.service';


class CabaniasList extends Component {
    constructor() {
        super();
        this.state = {
            cabanias: []
        }
    }

    componentDidMount() {
        this.fetchCabanias();
    }

    fetchCabanias() {
        fetch('/api/cabanias')
            .then(res => res.json())
            .then(data => {
                this.setState({ cabanias: data })
            });
    }

    saveFavorite(id) {
        fetch('/api/favorites', {
            method: 'POST',
            body: JSON.stringify({userId:service.getUserId(),cabaniaId:id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                M.toast({ html: data.status })
                //this.clearFields();
                //this.fetchCabanias();
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Fragment>
                <h2 className='initalMargin'>Cabanias lists</h2>
                {
                    this.state.cabanias.map(cab => {
                        return (
                            <div className='container' key={cab._id}>
                                <div className='row'>
                                    <div className='col s-6'>
                                        <div className='card'>
                                            <div className='card-content' >
                                                <div className='row'>
                                                    <h4>{cab.title}</h4>
                                                </div>
                                                <div className='row'>
                                                    {cab.description}
                                                </div>
                                                {
                                                    cab.imgURI != "" && <div className='row'>
                                                        <img src={cab.imgURI} alt={cab.title} />
                                                    </div>
                                                }
                                                <div>

                                                    <Link to={"getCabania/" + cab._id}>Consult</Link>

                                                    {/* <button className='btn light-blue darken-4' >
                                                            Consult
                                                        </button> */}
                                                </div>
                                                <div>
                                                <button className='btn light-blue darken-4' onClick={ () => this.saveFavorite(cab._id) } >
                                                     <i className='material-icons'>favorite
                                                     </i>
                                                         </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default CabaniasList;