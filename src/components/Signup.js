import React, { Component } from 'react';
import { Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import '../styles/login.css';

class Signup extends Component {
    
    render(){
        return(
            <div className="container">
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
                        <Button type="primary"><Link to="/" className="links">Sign up</Link></Button>
                    </div>
                    <div>
                        Already a member <Link to="/">Login here</Link>
                    </div>
                </form>
            </div>
        );
    }

}

export default Signup;