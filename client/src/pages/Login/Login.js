import React, {Component} from "react";
import "./Login.css";
import { Container } from "../../components/Grid";
import API from "../../utils/API"

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            logInEmail: "",
            logInPassword: "",
            notice: ""
        }
    }

    componentDidMount() {
        this.setState({
            logInEmail: "",
            logInPassword: "",
            notice: ""
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
        this.setState({
            notice: ""
        })
        let userInfo =  {
            email: this.state.logInEmail,
            password: this.state.logInPassword
        }

        API.localLogIn(userInfo)
        .then(result=>{
            console.log(result)
            if (result.data.message === "success") {
                this.props.createCookie("loggedinId", result.data._id)
                this.props.createCookie("userType", result.data.userType)
                window.location.href="/admin"
            } else {
                this.setState({notice: "Email or password do not match, please try again.."})
            }
        }).catch(err=>{
            // console.log(err)
            this.setState({
                notice: `Server Error, please contact Admin.. Err code: ${err.status}`
            })
        })
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
                                className="form-control" 
                                type="password"
                                name="logInPassword"
                                value={this.state.loginPsw}
                                onChange={this.handleInputChange}                            
                            />
                        </div>
                        <div>{this.state.notice}</div>
                        <button 
                            id="loginBtn" 
                            type="button" 
                            className="btn btn-raised btn-success"
                            disabled={!(this.state.logInEmail || this.state.logInPassword)}
                            onClick={this.handleLogin}
                        > Log In </button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Login