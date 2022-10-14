import React, { Fragment, useState } from 'react';



function CreateAccount(props) {
    
const [Name, setName] = useState("");
const [LastName, setLastName] = useState("");
const [UserName, setUserName] = useState("");
const [Password, setPassword] = useState("");

function handleChange(e) {
    const { name, value } = e.target;
    
    if(name=="Name"){
        setName(value);
    }
    if(name=="LastName"){
        setLastName(value);
    }
    if(name=="UserName"){
        setUserName(value);
    }
    if(name=="Password"){
        setPassword(value);
    }
    
}

function create(e){
    e.preventDefault();
    alert(Name);
}

    return (
        <Fragment>
                <div className='container' style={{ marginTop:'80px' }}>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={create}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="Name" onChange={handleChange} type="text" placeholder='Name' />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="LastName" onChange={handleChange} type="text" placeholder='LastName'  />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="UserName" onChange={handleChange} type="text" placeholder='UserName'  />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name="Password" onChange={handleChange} type="password" placeholder='Password' />
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
        </Fragment>
    )
}

export default CreateAccount;