import React, { Component, Fragment } from 'react';


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
                console.log(data);
                this.setState({ cabanias: data })
            });
    }

    render() {
        return (
            <Fragment>
                <h2>Cabanias List:</h2>
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
                                                <div className='row'>
                                                    <img src={cab.imgURI} alt={cab.title} />
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