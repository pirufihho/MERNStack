import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class GetCabania extends Component {
    constructor() {
        super();
        this.state = {
            cabania: {},
            id: ''
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.params.id })
        this.fetchCabaniaById(this.props.params.id);
    }

    fetchCabaniaById(id) {
        console.log(id)
        fetch('/api/cabanias/' + id)
            .then(res => res.json())
            .then(data => {
                this.setState({ cabania: data })
            });
    }

    render() {
        return (
            <Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className='col s-6'>
                            <div className='card'>
                                <div className='card-content' >
                                    <div className='row'>
                                        <h4>{this.state.cabania.title}</h4>
                                    </div>
                                    <div className='row'>
                                        {this.state.cabania.description}
                                    </div>
                                    {
                                        this.state.cabania.imgURI != "" && <div className='row'>
                                            <img src={this.state.cabania.imgURI} alt={this.state.cabania.title} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default withParams(GetCabania);