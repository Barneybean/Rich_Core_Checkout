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
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
  //react child cannot be obj so has to be arr to hols obj!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! and use map to read arr in child 

  componentWillMount() {
    this.loadCourses();
    this.loadCart();
  }

  loadCourses = () => {
    API.getCourses()
      .then(
        result => {
          // console.log(result);
          this.setState({
            courses: result.data,
            selectedCourseForDetail: [result.data[0]]
          })
        })
      .catch(err => {
        console.log(err);
        this.setState({ errorNotice: "An error occured, please refresh.." })
      })
  }

  viewCourseDetail = (course) => {
    // console.log("view detail", course)
    this.setState({ "selectedCourseForDetail": [course] })

  }

  addToCart = (courseImage, _id, name, tokenValue, courseCode) => {
    //if logged in then write to db, else write into local storage
    if (this.state.loggedInId === "") {
      console.log("added to Cart", name)
      let addCourse = {
        courseImage, _id, name, tokenValue, courseCode
      };
      let cartArr = this.state.addedToCart;
      //prevent duplicate
      let match = false;
      for (let i=0;i<cartArr.length; i++) {
        if (cartArr[i].name === addCourse.name) {
          match = true;
        }
      }
      console.log("bool",match)
      if (!match) {
        cartArr.push(addCourse);
      }
      //...
      this.setState({ addedToCart: cartArr })
      //store courses in cart to session storage so it will stay when navigating to other pages
      let cartItems = JSON.stringify(cartArr);
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItems", cartItems);
    } else {
      // write in to db associate with logged in id
    }
  }

  loadCart = () => {
    let courseInCart = JSON.parse(localStorage.getItem("cartItems"));
    // console.log(courseInCart[0].name)
    if (courseInCart === null) {
      this.setState({addedToCart:[]})
    } else {
      this.setState({addedToCart:courseInCart})
    }
  }

  deleteItemInCart = (id) => {
    //find matching name and delete
    console.log("delete course in cart", id)
  }

  render() {
    // console.log("app render", this.state.selectedCourseForDetail)
    // console.log("app render", this.state.courses)
    // console.log(this.state.addedToCart)
    return (
      <div className="App">
        <LogoBanner
          loginStatus={this.state.loginStatus}
          cartCount={this.state.addedToCart.length}
        />
        <Router>
          {(this.state.loggedInId === '') ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/courses" component={() => (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart} />)} />
              <Route exact path="/cart" component={()=>(<Cart addedToCart={this.state.addedToCart} deleteItemInCart={this.deleteItemInCart}/>)}/>
              <Route exact path="/login" component={Login} />
              <Redirect from="/student" to="/login" />
              <Redirect from="/admin" to="/login" />
              <Route component={NoMatch} />
            </Switch>
          ) : (
              this.state.userType === "admin" ? (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/admin" component={Admin} />
                  <Route exact path="/courses" component={() => (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart} />)} />
                  <Route exact path="/cart" component={()=>(<Cart addedToCart={this.state.addedToCart} deleteItemInCart={this.deleteItemInCart}/>)}/>
                  <Route exact path="/login" component={Login} />
                  <Redirect from="/student" to="/login" />
                  <Route component={NoMatch} />
                </Switch>
              ) : (
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/student" component={Student} />
                    <Route exact path="/courses" component={() => (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart} />)} />
                    <Route exact path="/cart" component={()=>(<Cart addedToCart={this.state.addedToCart} deleteItemInCart={this.deleteItemInCart}/>)}/>
                    <Route exact path="/login" component={Login} />
                    <Redirect from="/admin" to="/login" />
                    <Route component={NoMatch} />
                  </Switch>
                )
            )}
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
