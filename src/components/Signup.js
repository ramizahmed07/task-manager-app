import React, { Component } from 'react';
import { Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import '../styles/signup.css';

class Signup extends Component {
    
    render(){
        return(
            <div className="signup-container">
                <form>
                    <h1>Sign Up</h1>
                    <div>
                        <Input className="input" placeholder="Email" />
                    </div>
                    <div>
                        <Input.Password className="input" placeholder="Password" />
                    </div>
                    <div>
                        <Input.Password className="input" placeholder="Confirm password" />
                    </div>
                    <div>
                        <Input className="input" placeholder="Nickname" />
                    </div>
                    <div>
                        <Input className="input" placeholder="Number" />
                    </div>
                    <div className="buttonContainer">
                        <Button type="primary" className="signup"><Link to="/" className="links">Sign up</Link></Button>
                    </div>
                    <div className="signUp">
                        Already a member <Link to="/" className="signUpLink">Login here</Link>
                    </div>
                </form>
            </div>
        );
    }

}

export default Signup;