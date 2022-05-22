import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";

//function wrapper to retrive params from uri
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class GetCabania extends Component {
    constructor() {
        super();
        this.state = {
            cabania: {},
            id: '',
            mailTo:'',
            whatsapp:''
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
                this.setState({whatsapp:'https://wa.me/'+data.phone})
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
                                        Phone Number: <b>{this.state.cabania.phone}</b> 
                                    </div>
                                    <div className='row'>
                                        E-Mail: <b>{this.state.cabania.mail}</b> 
                                    </div>
                                    <div className='row'>
                                        <a href={this.state.whatsapp} className='btn light-blue darken-4' >
                                                            <i className='material-icons'>call
                                                            </i>
                                        </a>

                                        <a className='btn light-blue darken-4 marginLeft' href={this.state.mailTo}>
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