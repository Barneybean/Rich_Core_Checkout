import React, { Component } from 'react'
import './App.css'
import LogoBanner from "./components/LogoBanner"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Student from "./pages/Student"
import Courses from "./pages/Courses"
import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

class App extends Component {
  state = {
    loginStatus: "Login",
    loggedInId: "",
    userType: "",
  }
  // // Cookie
  // createCookie = (name, value, days) => {
  //   if (days) {
  //     let date = new Date();
  //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  //     var expires = "; expires=" + date.toGMTString();
  //   }
  //   else expires = "";

  //   document.cookie = name + "=" + value + expires + "; path=/";
  // }

  // readCookie = a => {
  //   var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  //   return b ? b.pop() : '';
  // }

  // eraseCookie = (name) => {
  //   this.createCookie(name, "", -1);
  // }

  // checkLogIn = (loggedInId) => {
  //   // console.log("APP", loggedInId)
  //   if (!loggedInId === "") {
  //     this.setState({
  //       loggedInId: loggedInId
  //     })
  //   } else {
  //     this.setState({
  //       loggedInId: ""
  //     })
  //   }
  // }

  // //******************log out */
  // logOut = () => {
  //   this.eraseCookie("loggedinId")
  //   this.setState({
  //     loggedInId: ""
  //   })
  //   this.redirect()
  // }
  // //##################end logout

  render() {
    return (
      <div className="App">
        <LogoBanner 
          loginStatus = {this.state.loginStatus}
        />
        {/* <Wrapper/> */}
        <Router>
            {(this.state.loggedInId==='') ? (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/courses" component={Courses} />
                <Route exact path="/login" component={Login} />
                <Redirect from="/student" to="/login" />
                <Redirect from="/admin" to="/login" />
                <Route component={NoMatch} />
              </Switch>
            ) : ( 
              this.state.userType === "admin" ? (
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/admin" component={Admin}/>
                  <Route exact path="/courses" component={Courses} />
                  <Route exact path="/login" component={Login} />
                  <Redirect from="/student" to="/login" />
                  <Route component={NoMatch} />
                </Switch>
              ):(
                <Switch>
                <Route exact path="/" component={Home}/>
                  <Route exact path="/student" component={Student}/>
                  <Route exact path="/courses" component={Courses} />
                  <Route exact path="/login" component={Login} />
                  <Redirect from="/admin" to="/login" />
                  <Route component={NoMatch} />
                </Switch>
              )
            )}
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
