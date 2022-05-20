import React, { Component } from 'react';



class ABMCabanias extends Component {
    constructor() {
        super();
        this.state = {
                title: '',
                description:'',
                imgURI:'',
                _id:'',
                mail:'',
                phone:'',
                cabanias:[]
        }

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchCabanias();
    }

    clearFields() {
        this.setState({
            title: '',
            description: '',
            imgURI:'',
            _id: '',
            mail:'',
            phone:''
        })
    }

    addTask(e) {
        if (this.state._id) {
            fetch('/api/cabanias/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: data.status });
                    this.clearFields();
                    this.fetchCabanias();
                })
        } else {

            fetch('/api/cabanias', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    M.toast({ html: data.status })
                    this.clearFields();
                    this.fetchCabanias();
                })
                .catch(err => console.log(err))
        }
        e.preventDefault();
    }

    fetchCabanias() {
        fetch('/api/cabanias')
            .then(res => res.json())
            .then(data => {
                this.setState({ cabanias: data })
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
                [name]:value
        })
    }

    deleteCabania(id) {
        if (confirm('Are you sure you want to delete it')) {
            fetch('/api/cabanias/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: data.status });
                    this.fetchCabanias();
                })
        }
    }

    editCabania(id) {
        fetch('/api/cabanias/' + id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    imgURI:data.imgURI,
                    _id: data._id,
                    mail: data.mail ? data.mail : '',
                    phone: data.phone ? data.phone : ''
                })
            })
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                {/* <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>MERN Stack</a>
                    </div>
                </nav> */}

                <div className='container' style={{ marginTop:'80px' }}>
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
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="mail" onChange={this.handleChange} type="text" placeholder='Mail' value={this.state.mail} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="phone" onChange={this.handleChange} type="text" placeholder='Phone' value={this.state.phone} />
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
                                                        <button className='btn light-blue darken-4' onClick={() => this.deleteCabania(cab._id)}>
                                                            <i className='material-icons'>delete
                                                            </i>
                                                        </button>
                                                        <button className='btn light-blue darken-4' onClick={() => this.editCabania(cab._id)} >
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