import React, { Component } from 'react';
import {Link} from "react-router-dom";

class LoginDash extends Component{

    render() {
        return (
            <div className="z-depth-1 grey lighten-4 row login">
                    <br/>
                    <form className="col s12">
                        <div className="row">
                            <input className="col offset-s2 s8 validate" type="email" placeholder="Email"/>
                        </div>
                        <div className="row">
                            <input className="col offset-s2 s8 validate" type="password" placeholder="Password"/>
                        </div>
                        <div className="row">
                            <button className="col offset-s4 s4 btn btn-large red accent-4">Login</button>
                        </div>
                        <div className="row">
                            <Link className="col offset-s5 s4" to="/register">register</Link>
                        </div>
                    </form>
                    <br/>
            </div>
        );
    }


}

export default LoginDash;
