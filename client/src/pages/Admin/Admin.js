import React, { Component } from "react"
import "./Admin.css"
import API from "../../utils/API"
import { Row, Col, Container } from "../../components/Grid";
import { PlainInput, FormBtn } from "../../components/Form";
import Profile from "../../components/Profile"
import AdminCourseList from "../../components/AdminCourseList/AdminCourseList";
import AddCourse from "../../components/AddCourse"
import PaymentHist from "../../components/PaymentHist"

class Admin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            birthday: "",
            password: "",
            loggedinId: "",
            profileNotice: "No action since logged in",
            imageLink: "",
            editing: false,
            AdminCourseEdit: false,
            emailSearch: "",
            emailSearchResults:[],
            paymentHistory: []
        }
    }

    componentDidMount() {
        let cookieId = this.props.readCookie("loggedinId")
        this.getUser(cookieId);

        this.setState({
            loggedinId: cookieId,
        })
        this.load30Payments();
        // this.loadAllPayments();
    }

    loadAllPayments = () => {
        API.loadAllPaymentHistory()
        .then(result=>{
            // console.log(result);
            this.setState({paymentHistory: result.data})
        }).catch(err=>{
            console.log(err)
            alert(`Payment history failed to load, please refresh or contact admin`)
        })
    }

    load30Payments = () => {
        //limit to 30
        API.load30PaymentHistory()
        .then(result=>{
            // console.log(result);
            this.setState({paymentHistory: result.data.reverse()})
        }).catch(err=>{
            console.log(err)
            alert(`Payment history failed to load, please refresh or contact admin`)
        })
    }

    editProfile = () => {
        (this.state.editing) ?
        this.editPassword()
        : this.setState({ editing: true });
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    getUser(id) {
        API.searchById(id).then((results) => {
            // console.log(results)
            this.setState({
                email: results.data.email,
                password: results.data.password
            })
        }).catch(err => {
            console.log(err)
        })
    }

    editPassword() {
        (this.state.password) ? (
            API.updateById(
                this.state.loggedinId, {
                    password: this.state.password
                }).then(results => {
                    console.log(results)
                    this.setState({
                        editing: false,
                        profileNotice: results.data.message
                    })
                }).catch(err => alert("error, please try again or contact developer"))
        ) : (
                alert("password cannot be empty")
            )
    }

    deleteCourse = (id) => {
        console.log("delete in admin", id)
        API.deleteAdminCourse(id)
        .then(result=>{
            console.log(result)
            this.props.loadCourses();
            this.props.deleteItemInCart(id)
        }).catch(err=>{
            console.log(err)
            alert("err")
        })
    }

    handleEmailSearch = (event) => {
        event.preventDefault();
        // console.log("email search", this.state.emailSearch)
        API.searchPaymentByEmail({email: this.state.emailSearch})
        .then(result=>{
            // console.log(result.data)
            this.setState({emailSearchResults: result.data})
          
        }).catch(err=>{
            console.log(err)
            alert("Search error, please try again or contact admin")
        })
    }

    render() {
        // console.log(this.state.paymentHistory)
        return (
            <div className=" admin">
                <div className="row"> 
                    <div className="col-lg-2 verticalNav">
                        <div id="navLink">
                            <a href="#courses" className="navItem"><h6>Courses</h6></a>
                            <br />
                            <a href="#orders" className="navItem"><h6>Orders</h6></a>
                            <br />
                            <a href="#profile" className="navItem"><h6>Setting</h6></a>
                        </div>
                    </div>
                    <div className="col-lg-10 adminBody">
                        <section id="courses">
                            <Container>
                                <Row>
                                    <Col size="7">
                                        {this.props.courses.map((item, i) => {
                                            return (
                                                <AdminCourseList
                                                    key={i}
                                                    editing={this.state.AdminCourseEdit}
                                                    courseCode={item.courseCode}
                                                    courseImage={item.courseImage}
                                                    name={item.name}
                                                    tokenValue={item.tokenValue}
                                                    courseDetail={item.courseDetail}
                                                    deleteCourse={this.deleteCourse}
                                                    _id={item._id}
                                                />
                                            )
                                        })}
                                    </Col>
                                    <Col size="5">
                                        <AddCourse
                                            loadCourses={this.props.loadCourses}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                        <section id="orders">
                            <Container>
                                <Row>
                                    <Col size="7">
                                        <span className="header"> RECENT PAYMENT HISTORY - default 30 items</span>  
                                        <FormBtn 
                                            onClick={this.loadAllPayments}
                                        >SHOW ALL</FormBtn>                                      
                                        <FormBtn 
                                            onClick={this.load30Payments}
                                        >SHOW LATEST 30 ITEMS</FormBtn>                                      
                                        <div className="col-lg overflow">
                                            {this.state.paymentHistory.map((item, i) => {
                                                return (
                                                    <PaymentHist
                                                        key={i}
                                                        num={i+1}
                                                        refNo={item.refNo}
                                                        coin={item.coin}
                                                        amount={item.amount}
                                                        email={item.email}
                                                        firstName={item.firstName}
                                                        lastName={item.lastName}
                                                        time={item.time}
                                                        courseCodes={item.courseCodes}
                                                        courseNames={item.name}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </Col>
                                    <Col size="5">
                                        <Row>
                                            <Col size="12">
                                                <PlainInput 
                                                    label="SEARCH BY STUDENT EMAIL"
                                                    placeholder="example@gmail.com"
                                                    onChange={this.handleInputChange}
                                                    name="emailSearch"
                                                    value={this.state.emailSearch}
                                                />
                                                <FormBtn 
                                                    float=""
                                                    disabled = {!this.state.emailSearch}
                                                    onClick = {this.handleEmailSearch}
                                                >
                                                    Search
                                                </FormBtn>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="12">
                                                RESULT
                                                <div className="col-lg overflow">
                                                    {this.state.emailSearchResults.map((item, i) => {
                                                        return (
                                                            <PaymentHist
                                                                key={i}
                                                                num={i+1}
                                                                refNo={item.refNo}
                                                                coin={item.coin}
                                                                amount={item.amount}
                                                                email={item.email}
                                                                firstName={item.firstName}
                                                                lastName={item.lastName}
                                                                time={item.time}
                                                                courseCodes={item.courseCodes}
                                                                courseNames={item.name}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                        <section id="profile">
                            <Profile
                                email={this.state.email}
                                password={this.state.password}
                                change={this.handleInputChange}
                                editing={this.state.editing}
                                edit={this.editProfile}
                                notice={this.state.profileNotice}
                            />
                        </section>
                    </div>
                </div>
            </div>

        )
    }
}

export default Admin