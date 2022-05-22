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
            id: '',
            mailTo:''
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
                this.setState({mailTo:'mailto:'+data.mail})
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
                                    <div className='row'>
                                        <button className='btn light-blue darken-4' >
                                                            <i className='material-icons'>call
                                                            </i>
                                        </button>

                                        <a className='btn light-blue darken-4' href={this.state.mailTo}>
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
}

export default withParams(GetCabania);