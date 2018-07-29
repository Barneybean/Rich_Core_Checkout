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
    courses: [],
    selectedCourseForDetail: [],
    addedToCart: [],
    errorNotice: '',
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
          courses: result.data,
          selectedCourseForDetail: [result.data[0]]
        })
    })
    .catch(err=>{
        console.log(err);
        this.setState({errorNotice: "An error occured, please refresh.."})
    })
  }

  viewCourseDetail = (course) => {
    // console.log("view detail", course)
    this.setState({"selectedCourseForDetail": [course]})
  
  }

  addToCart = (courseImage, _id, name, tokenValue, courseCode) => {
    //if logged in then write to db, else write into local storage
    console.log("added to Cart", )
    let addCourse = {
      courseImage, _id, name, tokenValue, courseCode
    };
    this.state.addedToCart.push(addCourse)
  }

  render() {
    console.log("app render", this.state.selectedCourseForDetail)
    console.log("app render", this.state.courses)
    return (
      <div className="App">
        <LogoBanner 
          loginStatus = {this.state.loginStatus}
          cartCount = {this.state.addedToCart.length}
        />
        <Router>
            {(this.state.loggedInId==='') ? (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/courses" component={()=> (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart}/>)} />
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
                  <Route exact path="/courses" component={()=> (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart}/>)} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/login" component={Login} />
                  <Redirect from="/student" to="/login" />
                  <Route component={NoMatch} />
                </Switch>
              ):(
                <Switch>
                <Route exact path="/" component={Home}/>
                  <Route exact path="/student" component={Student}/>
                  <Route exact path="/courses" component={()=> (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart}/>)} />
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
