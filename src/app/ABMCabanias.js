import React, { Component } from 'react';



class ABMCabanias extends Component {
    constructor() {
        super();
        this.state = {
                title: '',
                description:'',
                imgURI:'',
                _id:'',
                cabanias:[]
        }

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
                [name]:value
        })
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>MERN Stack</a>
                    </div>
                </nav>

                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="title" onChange={this.handleChange} type="text" placeholder='Task title' value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name="description" onChange={this.handleChange} className='materialize-textarea' 
                                                placeholder='Task description' value={this.state.description} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="imgURI" onChange={this.handleChange} type="text" placeholder='Img URI' value={this.state.imgURI} />
                                            </div>
                                        </div>
                                        <button type="submit" className='btn light-blue darken-4'>
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Img URI
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.cabanias.map(cab => {
                                            return (
                                                <tr key={cab._id}>
                                                    <td>{cab.title}</td>
                                                    <td>{cab.description}</td>
                                                    <td>{cab.imgURI}</td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' >
                                                            <i className='material-icons'>delete
                                                            </i>
                                                        </button>
                                                        <button className='btn light-blue darken-4' >
                                                            <i className='material-icons'>edit
                                                            </i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ABMCabanias;