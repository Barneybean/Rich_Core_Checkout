import React, {Component} from "react";
import "./Login.css";
import { Container } from "../../components/Grid";

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            logInEmail: "",
            logInPassword: "",
            loggedInId: "",
            notice: ""
        }
    }

    componentDidMount() {
        this.setState({
            logInEmail: "",
            logInPassword: "",
            signUpEmail: "",
            signUpPassword: "",
        })
    }

    //*******************form  */
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleLogin = (event) => {
        event.preventDefault();

    }

    render () {
        return (
            <Container>
                <div id="loginForm">
                    <form>
                        <div className="form-group">
                            <p id="loginTitle">Admin Login</p>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="name@example.com"
                                name="logInEmail"
                                value={this.state.logInEmail}
                                onChange={this.handleInputChange}                            
                            />
                            <br/>
                            <input 
                                type="email" 
                                className="form-control" 
                                type="password"
                                name="logInPsw"
                                value={this.state.loginPsw}
                                onChange={this.handleInputChange}                            
                            />
                        </div>
                        <div>{this.state.notice}</div>
                        <button id="loginBtn" type="button" className="btn btn-raised btn-success"
                            onClick={this.handleLogin}
                        > Log In </button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Login