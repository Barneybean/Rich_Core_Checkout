import React, {Component} from "react"
import "./Courses.css"
import { Col, Row, Container } from "../../components/Grid"
import Alert from "../../components/Alert"
import API from "../../utils/API"
import Objective from "../../components/Objective/Objective"
import CourseDetail from "../../components/CourseContents/CourseDetail"
import CourseListItem from "../../components/CourseContents/CourseListItem"


class Courses extends Component {

    constructor (props) {
        super(props)
        this.state = {
            courses: [],
            errorNotice: ""
        }
    }

    componentWillMount() {
        this.loadCourses();
    }

    loadCourses = () => {
        API.getCourses()
        .then(
            result=>{
            console.log(result);
            this.setState({
                course: result.data
            })
        })
        .catch(err=>{
            console.log(err);
            this.setState({errorNotice: "An error occured, please refresh.."})
        })
    }

    viewCourseDetail = () => {
        console.log(this)
    }
    
    render () {
        return (
            <Container fluid>
                <Row fluid> 
                    <Objective/>
                </Row>
                <hr/>
                <Row> 
                    {this.state.errorNotice ? (<Alert notice={this.state.errorNotice}/>):(null)}
                    <Col size="lg-6">
                        {this.state.courses.map((item, i)=>{
                            <CourseListItem
                                key = {i}
                                courseImage = {item.courseImage}
                                courseName = {item.name}
                                onCLick = {this.viewCourseDetail}
                            />
                        })}
                    </Col>
                    <Col size="lg-6">
                        <CourseDetail/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Courses