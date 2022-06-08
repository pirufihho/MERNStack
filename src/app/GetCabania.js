import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";
import RenderCabania from './RenderCabania';

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
             <RenderCabania cabania={this.state.cabania} showDelete={false}></RenderCabania>
        )
    }
}

export default withParams(GetCabania);