import React, { Component } from 'react';
import userService from '../services/user.service';


class ABMCabanias extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            imgURI: '',
            _id: '',
            mail: '',
            phone: '',
            province: '',
            city: '',
            cabanias: [],
            cabaniasFiltered:[],
            filters: {
                title: '',
                description: '',
                id: ''
            },
            toggleFilters: false,
            jwt: userService.getJWT()
        }

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFilters = this.handleChangeFilters.bind(this);
    }

    componentDidMount() {
        this.fetchCabanias();
        this.setState({toggleFilters:false});
    }

    clearFields() {
        this.setState({
            title: '',
            description: '',
            imgURI: '',
            _id: '',
            mail: '',
            phone: '',
            province: '',
            city: ''
        })
    }

    async addTask(e) {
        
        e.preventDefault();
      
        let response;
        let data;
        let method;
        let url;
      
        if (this.state._id) {
          method = 'PUT';
          url = '/api/cabanias/' + this.state._id;
        } else {
          method = 'POST';
          url = '/api/cabanias';
        }
      
        try {
          response = await fetch(url, {
            method: method,
            body: JSON.stringify(this.state),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `${this.state.jwt}`, // Pass the JWT token as an authorization header
            },
          });
          data = await response.json();
        } catch (err) {
          console.log(err);
          M.toast({ html: err });
          return;
        }
      
        M.toast({ html: data.status });
        this.clearFields();
        this.fetchCabanias();
      }
      
      
      

    async fetchCabanias() {
        let response;
        let data;
        let url = '/api/cabanias';

        try {
            response = await fetch(url)
            data = await response.json();
        }
        catch (err){
            console.log(err);
            return;
        }

        this.setState({ cabanias: data })
        this.setState({cabaniasFiltered:data})
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleChangeFilters(e) {
        const { name, value } = e.target;

        this.setState(prevState => ({
            filters: {                   // object that we want to update
                ...prevState.filters,    // keep all other key-value pairs
                [name]: value           // update the value of specific key
            }
        }))
    }

    async deleteCabania(id) {
        if (window.confirm('Are you sure you want to delete it')) {
          try {
            const res = await fetch(`/api/cabanias/${id}`, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.jwt}`, // Pass the JWT token as an authorization header
              },
            });
            const data = await res.json();
      
            M.toast({ html: data.status });
            this.fetchCabanias();
          } catch (error) {
            console.error(error);
          }
        }
      }
      

      async editCabania(id) {
        try {
          const res = await fetch(`/api/cabanias/${id}`);
          const data = await res.json();
      
          this.setState({
            title: data.title,
            description: data.description,
            imgURI: data.imgURI,
            _id: data._id,
            mail: data.mail ?? '',
            phone: data.phone ?? '',
            province: data.province ?? '',
            city: data.city ?? '',
          });
        } catch (error) {
          console.error(error);
        }
      }
      

    search() {
        const { id, title, description } = this.state.filters;
        let cabaniasFiltered = this.state.cabanias;
      
        if (id) {
          cabaniasFiltered = cabaniasFiltered.filter(cabania => cabania._id.includes(id));
        }
        if (title) {
          cabaniasFiltered = cabaniasFiltered.filter(cabania => cabania.title.includes(title));
        }
        if (description) {
          cabaniasFiltered = cabaniasFiltered.filter(cabania => cabania.description.includes(description));
        }
      
        this.setState({ cabaniasFiltered });
    }

    clearFilters(){
        this.setState(prevState => ({
            filters: {                   
                ...prevState.filters,    
                id: '',
                title:'',
                description:''
                           
            }
        }))
    }

    render() {
        return (
            <div>
                <div className='container' style={{ marginTop: '80px' }}>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row rowMargin'>
                                            <div className='input-field col s12'>
                                                <input className='inputHeight' name="title" onChange={this.handleChange} type="text" placeholder='Title' value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className='row rowMargin'>
                                            <div className='input-field col s12'>
                                                <textarea name="description" onChange={this.handleChange} className='materialize-textarea inputHeight'
                                                    placeholder='Description' value={this.state.description} />
                                            </div>
                                        </div>
                                        <div className='row rowMargin'>
                                            <div className='input-field col s12'>
                                                <input className='inputHeight' name="imgURI" onChange={this.handleChange} type="text" placeholder='Img URI' value={this.state.imgURI} />
                                            </div>
                                        </div>
                                        <div className='row rowMargin'>
                                            <div className='input-field col s12'>
                                                <input className='inputHeight' name="mail" onChange={this.handleChange} type="text" placeholder='Mail' value={this.state.mail} />
                                            </div>
                                        </div>
                                        <div className='row rowMargin'>
                                            <div className='input-field col s12'>
                                                <input className='inputHeight' name="phone" onChange={this.handleChange} type="text" placeholder='Phone' value={this.state.phone} />
                                            </div>
                                        </div>
                                        <div className='row rowMargin'>
                                            <div className='input-field col s12'>
                                                <input className='inputHeight' name="province" onChange={this.handleChange} type="text" placeholder='Province' value={this.state.province} />
                                            </div>
                                        </div>
                                        <div className='row rowMargin'>
                                            <div className='input-field col s12'>
                                                <input className='inputHeight' name="city" onChange={this.handleChange} type="text" placeholder='City' value={this.state.city} />
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

                            <div className='card'>
                                <div className='card-content'>
                                    <div className='row'>
                                        <div className='col s10'>
                                            <h5>Filters</h5>
                                        </div>
                                        <div className='col s2'>
                                            <button className='btn' onClick={ () => this.setState({toggleFilters: !this.state.toggleFilters}) } >
                                                <i className='material-icons'>unfold_more
                                                </i>
                                            </button>
                                        </div>
                                    </div>
                                    {this.state.toggleFilters && <div className='row' >
                                        <div className='input-field col s6'>
                                            <input className='inputHeight' name="id" type="text" placeholder='Id' onChange={this.handleChangeFilters} value={this.state.filters.id|| ''} />
                                        </div>
                                        <div className='input-field col s6'>
                                            <input className='inputHeight' name="title" type="text" placeholder='Title' onChange={this.handleChangeFilters} value={this.state.filters.title|| ''} />
                                        </div>
                                        <div className='input-field col s6'>
                                            <input className='inputHeight' name="description" type="text" placeholder='Description' onChange={this.handleChangeFilters} value={this.state.filters.description|| ''} />
                                        </div>
                                        <div className='input-field col s2'>
                                            <button className='btn light-blue darken-4' onClick={() => this.search()}>
                                                Search
                                            </button>
                                        </div>
                                        <div className='input-field col s2'>
                                            <button className='btn light-blue darken-4' onClick={() => this.clearFilters()}>
                                                ClearFilters
                                            </button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Id
                                        </th>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.cabaniasFiltered.map(cab => {
                                            return (
                                                <tr key={cab._id}>
                                                    <td>{cab._id}</td>
                                                    <td>{cab.title}</td>
                                                    <td>{cab.description}</td>
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