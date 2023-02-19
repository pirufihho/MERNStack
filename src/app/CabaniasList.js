import React, { Component, Fragment } from 'react';
import userService from '../services/user.service';
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
            selectedCity: '',
            adminUser: userService.isAdminUser(),
            jwt: userService.getJWT()
        }

        this.handleChangeFilters = this.handleChangeFilters.bind(this);
    }

    componentDidMount() {
        console.log(this.state.jwt)
        this.setState({jwt: userService.getJWT()})
        this.fetchCabanias();
    }

    getProvinciesCities(data) {
        let provincies;
        let cities;

        if (data) {
            provincies = data.map(x => {
                return x.province;
            })
            cities = data.map(x => {
                return x.city;
            })

            //...new Set of array to get distinct values
            this.setState({ provincies: [...new Set(provincies)] });
            this.setState({ cities: [...new Set(cities)] });
        }
    }

    async fetchCabanias() {
        let response;
        let data;
        let url= '/api/cabanias';

        try {
            response = await fetch(url);
            data = await response.json();
        }
        catch(err){
            console.log(err);
        }

        this.setState({ cabanias: data })
        this.setState({ allCabanias: data })
        this.getProvinciesCities(data);
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

    handleChangeFilters(event) {
        if (event.target.id == "selProvincies") {
            this.setState({ selectedProvince: event.target.value })
        } else {
            this.setState({ selectedCity: event.target.value })
        }
    }

    async saveFavorite(_data) {
        console.log(this.state)
        
        let response;
        let data;
        let method ='POST';
        let url = '/api/favorites';
        let headers ={
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: userService.getJWT(),
        }

        try {
            response = await fetch(url, {
                method: method,
                body: JSON.stringify({ userId: userService.getUserId(), cabaniaId: _data._id }),
                headers: headers
            })

            data = await response.json()
        }
        catch (err){
            console.log(err);
            return
        }

        M.toast({ html: data.status })
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
                                <select className='select' onChange={this.handleChangeFilters} id="selProvincies">
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
                                <select className='select' onChange={this.handleChangeFilters} id="selCities">
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
                            showDelete={false} showFavorite={this.state.adminUser} />
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default CabaniasList;