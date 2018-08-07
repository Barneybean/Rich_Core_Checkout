import React, { Component } from "react"
import "./Admin.css"
import Profile from "../../components/Profile"
import API from "../../utils/API"
import { Row, Col, Container } from "../../components/Grid";
import AdminCourseList from "../../components/AdminCourseList/AdminCourseList";
import AddCourse from "../../components/AddCourse"

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
            AdminCourseEdit: false
        }
    }

    componentDidMount() {
        let cookieId = this.props.readCookie("loggedinId")
        this.getUser(cookieId);

        this.setState({
            loggedinId: cookieId,
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

    render() {
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
                            view orders
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