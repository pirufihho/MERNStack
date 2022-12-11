import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import service from '../services/user.service';
import RenderCabania from './RenderCabania';

class CabaniasList extends Component {
    constructor() {
        super();
        this.state = {
            allCabanias: [],
            cabanias: [],
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
                this.setState({ cabanias: data })
                this.setState({ allCabanias: data })
                this.getProvinciesCities(data);
            });
    }

    search() {
        var filtered = this.state.allCabanias;

        if (this.state.selectedCity) {
            filtered = filtered.filter(x => x.city == this.state.selectedCity);
        }
        if (this.state.selectedProvince) {
            filtered = filtered.filter(x => x.province == this.state.selectedProvince)
        }

        this.setState({ cabanias: filtered });
    }

    handleChange(event) {
        if (event.target.id == "selProvincies") {
            this.setState({ selectedProvince: event.target.value })
        } else {
            this.setState({ selectedCity: event.target.value })
        }
    }

    saveFavorite(data) {
        console.log(data);
        fetch('/api/favorites', {
            method: 'POST',
            body: JSON.stringify({ userId: service.getUserId(), cabaniaId: data._id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                M.toast({ html: data.status })
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
                            <div className='col s2'>
                                <select className='select' onChange={this.handleChange} id="selProvincies">
                                    <option value="" >Choose your option</option>
                                    {
                                        this.state.provincies.map((x, index) => {
                                            return (<option key={index}> {x} </option>)
                                        })
                                    }
                                </select>
                                <label>Provincies</label>
                            </div>
                            <div className='col s2'>
                                <select className='select' onChange={this.handleChange} id="selCities">
                                    <option value="" >Choose your option</option>
                                    {
                                        this.state.cities.map((x, index) => {
                                            return (<option key={index} > {x} </option>)
                                        })
                                    }
                                </select>
                                <label>Cities</label>
                            </div>
                            <div className='col s2'>
                                <button className='btn light-blue darken-4' onClick={() => this.search()}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.cabanias.map(c => {
                        return (
                            <RenderCabania key={c._id} cabania={c} saveFavorite={this.saveFavorite} 
                            showDelete={false} showFavorite={true} />
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default CabaniasList;