import React, { Component } from 'react'
import './App.css'
import LogoBanner from "./components/LogoBanner"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Student from "./pages/Student"
import Courses from "./pages/Courses"
import Cart from "./pages/Cart"
import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import API from "./utils/API"

class App extends Component {
  state = {
    loginStatus: "Login",
    loggedInId: "",
    userType: "",
    cartCount: 0,
    courses: [],
    selectedCoursesInCart: [],
    errorNotice: ''
  }

  componentWillMount() {
    this.loadCourses();
  }
  
  loadCourses = () => {
    API.getCourses()
    .then(
        result=>{
        // console.log(result);
        this.setState({
          courses: result.data
        })
    })
    .catch(err=>{
        console.log(err);
        this.setState({errorNotice: "An error occured, please refresh.."})
    })
  }

  // showCourseDetail = (course) => {
  //   console.log("app, selected", course)
  //   this.setState({"selectedCourses": course})
  // }

  addToCart = (id) => {
    console.log("added", id)
  }

  // Cookie
  createCookie = (name, value, days) => {
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    }
    else expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
  }

  readCookie = a => {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  eraseCookie = (name) => {
    this.createCookie(name, "", -1);
  }

  checkLogIn = (loggedInId) => {
    // console.log("APP", loggedInId)
    if (!loggedInId === "") {
      this.setState({
        loggedInId: loggedInId
      })
    } else {
      this.setState({
        loggedInId: ""
      })
    }
  }

  //******************log out */
  logOut = () => {
    this.eraseCookie("loggedinId")
    this.setState({
      loggedInId: ""
    })
    this.redirect()
  }
  //##################end logout

  render() {
    // console.log("app render", this.state.courses)
    return (
      <div className="App">
        <LogoBanner 
          loginStatus = {this.state.loginStatus}
          cartCount = {this.state.cartCount}
        />
        <Router>
            {(this.state.loggedInId==='') ? (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/courses" component={()=> (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} addToCart={this.addToCart}/>)} />
                <Route exact path="/cart" component={Cart} />
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
                  <Route exact path="/courses" component={()=> (<Courses courselist={this.state.courses} errorNotice={this.state.errorNotice} addToCart={this.addToCart}/>)} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/login" component={Login} />
                  <Redirect from="/student" to="/login" />
                  <Route component={NoMatch} />
                </Switch>
              ):(
                <Switch>
                <Route exact path="/" component={Home}/>
                  <Route exact path="/student" component={Student}/>
                  <Route exact path="/courses" component={()=> (<Courses courselist={this.state.courses} errorNotice={this.state.errorNotice} addToCart={this.addToCart}/>)} />
                  <Route exact path="/cart" component={Cart} />
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
