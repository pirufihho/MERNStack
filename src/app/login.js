import React, { Component } from 'react';
import userService from '../services/user.service';
import {
    Link
  } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super();
        this.state = {
                userName:'',
                password:''
        }

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }


    login(e){
        e.preventDefault();
        userService.login(this.state.userName,this.state.password).then(response =>{
            //console.log(response);
            if(response.loggedIn){
                //handle login ok
                window.location.replace("http://localhost:3000")
            }else{
                M.toast({ html: 'User / Password incorrect.' });
            }
        })
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
                [name]:value
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
                                    <form onSubmit={this.login}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="userName" onChange={this.handleChange} type="text" placeholder='UserName' value={this.state.userName} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="password" onChange={this.handleChange} type="password" placeholder='Password' value={this.state.password} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                Dont have a user?  <Link to="/createAccount">Create an account</Link>
                                            </div>
                                        </div>
                                        <button type="submit" className='btn light-blue darken-4'>
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Login;