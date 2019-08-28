import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Input, Checkbox, Button } from 'antd';
import '../styles/login.css';


class Login extends Component {

    render() { 
        return ( 
            <div className="container">
                <form>
                    <h1>Login</h1>
                    <div>
                        <Input className="input" placeholder="Username" />
                    </div>
                    <div>
                        <Input.Password className="input" placeholder="Password" />
                    </div>
                    <div className="checkbox">
                        <span><Checkbox>Remember me</Checkbox></span>
                    </div>
                    <div className="buttonContainer">
                        <Button className="login" type="primary"><Link to="/todo" className="links">Login</Link></Button>
                    </div>

                    <div className="signUp">
                        Not a member? <Link to="/signup" class="signUpLink">Sign up now</Link>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default Login;