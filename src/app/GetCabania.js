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
            cabanias: []
        }
    }

    componentDidMount() {
        console.log(this.props.params.id);
    }

    fetchCabaniaById(id) {
        fetch('/api/cabanias')
            .then(res => res.json())
            .then(data => {
                this.setState({ cabanias: data })
            });
    }

    render() {
        return (
            <Fragment>
                    <h2 style={{ marginTop: '100px', marginLeft:'100px' }}>Title Cabania</h2>
                
            </Fragment>
        )
    }
}

export default withParams(GetCabania);