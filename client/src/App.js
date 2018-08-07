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
    loginSign: "Admin Login",
    loggedInId: "loggedOut",
    userType: "",
    courses: [],
    selectedCourseForDetail: [],
    addedToCart: [],
    errorNotice: '',
    isModalOpen: false,
  }
  //react child cannot be obj so has to be arr to hols obj!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! and use map to read arr in child 

  componentWillMount() {
    this.loadCourses();
    this.loadCart();

    let cookieId = this.readCookie("loggedinId")
    let userType = this.readCookie("userType")
    
    if (cookieId === "") {
      this.createCookie("loggedinId", "loggedOut", 1)
      this.setState({        
        loginSign: "Admin Login"
      })
    } else {
      // console.log("login id", cookieId)
      this.setState({
        loggedInId: cookieId,
        userType: userType,
        loginSign: "Log Out"
      })
    }
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
      loggedInId: "",
      loginStatus: "Admin Login"
    })
    this.redirect()
  }
  //##################end logout

  redirect = () => {
    if (this.state.loggedInId) {
      window.location.href = "/";
    }
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

  writeToLocalStorage = (name, item) => {
    localStorage.removeItem(name);
    localStorage.setItem(name, item);
  }

  addToCart = (courseImage, _id, name, tokenValue, courseCode) => {
    //if logged in then write to db, else write into local storage
    // if (this.state.loggedInId === "loggedOut") {
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
      this.writeToLocalStorage("cartItems", cartItems);
      // alert("New Item Added")
    // } else {
      // write in to db associate with logged in id
    // }
  }

  openModal = () => {
    console.log("opened")
    this.setState({ isModalOpen: true })
  }

  closeModal= () => {
    this.setState({ isModalOpen: false })
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
    let a = this.state.addedToCart
    //find the matching course to delete by courseCode
    let index = "";
    for (let j=0; j<a.length; j++) {
      if (a[j].courseCode === id) {
        index = j;
      }
    }
    //remove course from the arr     cannot mutate state directly must  
    a.splice(index, 1)
    this.setState({addedToCart: a})
    //update local storage too
    let updateCart = JSON.stringify(a);
    this.writeToLocalStorage("cartItems", updateCart);
  }

  render() {
    // console.log("app render", this.state.selectedCourseForDetail)
    // console.log("app render", this.state.courses)
    // console.log(this.state.addedToCart)
    console.log("new cart", this.state.addedToCart)
    return (
      <div className="App">
        <LogoBanner
          cartCount={this.state.addedToCart.length}
          logOut={this.logOut}
          loggedInId={this.state.loggedInId}
        />
        <Router>
          {(this.state.loggedInId === 'loggedOut') ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/courses" component={() => (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart} openModal={this.openModal} closeModal={this.closeModal} isModalOpen={this.state.isModalOpen}/>)}/>
              <Route exact path="/cart" component={()=>(<Cart addedToCart={this.state.addedToCart} deleteItemInCart={this.deleteItemInCart}/>)}/>
              <Route exact path="/login" component={()=>(<Login createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut}/>)} />
              <Redirect from="/student" to="/login" />
              <Redirect from="/admin" to="/login" />
              <Route component={NoMatch} />
            </Switch>
          ) : (
              this.state.userType === "admin" ? (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/admin" component={()=> (<Admin readCookie={this.readCookie} courses={this.state.courses}/>)} />
                  <Route exact path="/courses" component={() => (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart} openModal={this.openModal} closeModal={this.closeModal} isModalOpen={this.state.isModalOpen}/>)}/>
                  <Route exact path="/cart" component={()=>(<Cart addedToCart={this.state.addedToCart} deleteItemInCart={this.deleteItemInCart}/>)}/>
                  <Route exact path="/login" component={()=>(<Login createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut}/>)} />
                  <Redirect from="/student" to="/login" />
                  <Route component={NoMatch} />
                </Switch>
              ) : (
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/student" component={Student} />
                    <Route exact path="/courses" component={() => (<Courses courses={this.state.courses} errorNotice={this.state.errorNotice} selectedCourseForDetail={this.state.selectedCourseForDetail} viewCourseDetail={this.viewCourseDetail} addToCart={this.addToCart} openModal={this.openModal} closeModal={this.closeModal} isModalOpen={this.state.isModalOpen}/>)}/>
                    <Route exact path="/cart" component={()=>(<Cart addedToCart={this.state.addedToCart} deleteItemInCart={this.deleteItemInCart}/>)}/>
                    <Route exact path="/login" component={()=>(<Login createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut}/>)} />
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
