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
            cabanias: [],
            allCabanias: [],
            provincies: [],
            cities: [],
            selectedProvince: '',
            selectedCity: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchCabanias();
    }

    getProvinciesCities(data) {
        if (data) {
            var provincies = data.map(x => {
                return x.province;
            })
            var cities = data.map(x => {
                return x.city;
            })

            //...new Set of array to get distinct values
            this.setState({ provincies: [...new Set(provincies)] });
            this.setState({ cities: [...new Set(cities)] });
        }
    }

    fetchCabanias() {
        fetch('/api/cabanias')
            .then(res => res.json())
            .then(data => {
                this.setState({ allCabanias: data })
                this.setState({ cabanias: data })
                this.getProvinciesCities(data);
            });
    }

    selectFilter() {
        var filteredCabanias = this.state.allCabanias;

        if(this.state.selectedProvince){
            filteredCabanias = filteredCabanias.filter(x => x.province === this.state.selectedProvince);

            this.setState({ cabanias: filteredCabanias });
        }else{
            this.setState({ cabanias: this.state.allCabanias });
        }
    }

    handleChange(event) {
        if (event.target.id == "selProvincies") {
            this.setState({ selectedProvince: event.target.value })
        } else {
            this.setState({ selectedCity: event.target.value })
        }
    }

    saveFavorite(id) {
        fetch('/api/favorites', {
            method: 'POST',
            body: JSON.stringify({ userId: service.getUserId(), cabaniaId: id }),
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
                <div className='card'>
                    <div className='card-content'>
                        <div className='row'>
                            <div className='col s6'>
                                <h5>Filters</h5>
                            </div>
                            <div className='col s3'>
                                <select className='select' onChange={this.handleChange} id="selProvincies">
                                    <option value="" >All</option>
                                    {
                                        this.state.provincies.map((x, index) => {
                                            return (<option key={index}> {x} </option>)
                                        })
                                    }
                                </select>
                                <label>Provincies</label>
                            </div>
                            <div className='col s3'>
                            <button type="submit" className='btn light-blue darken-4' onClick={()=> this.selectFilter()}>
                                            Filter
                                        </button>
                                        </div>
                        </div>
                    </div>
                </div>
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
                                                    Province: <b>{cab.province}</b>
                                                </div>
                                                <div className='row'>
                                                    City: <b>{cab.city}</b>
                                                </div>
                                                <div className='row'>
                                                    {cab.description}
                                                </div>
                                                {
                                                    cab.imgURI != "" && <div className='row'>
                                                        <img className='imgCabania' src={cab.imgURI} alt={cab.title} />
                                                    </div>
                                                }
                                                <div>

                                                    <Link to={"getCabania/" + cab._id}>Consult</Link>

                                                    {/* <button className='btn light-blue darken-4' >
                                                            Consult
                                                        </button> */}
                                                </div>
                                                <div>
                                                    <button className='btn light-blue darken-4' onClick={() => this.saveFavorite(cab._id)} >
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