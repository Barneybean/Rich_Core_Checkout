import React, {Component} from "react"
import "./Courses.css"
import { Col, Row, Container } from "../../components/Grid"
import Alert from "../../components/Alert"
import Objective from "../../components/Objective/Objective"
import CourseDetail from "../../components/CourseContents/CourseDetail"
import CourseListItem from "../../components/CourseContents/CourseListItem"


class Courses extends Component {

    constructor (props) {
        super(props)
        this.state = {
            errorNotice: props.errorNotice,
            selectedCourseForDetail: {},
        }
    }

    viewCourseDetail = (course) => {
        // console.log("view detail", course)
        this.setState({"selectedCourseForDetail": course})
      
    }
    
    render () {
        console.log(this.props.courses)
        // console.log(this.state.selectedCourseForDetail)
        return (
            <Container fluid>
                <Row fluid> 
                    <Objective/>
                </Row>
                <hr/>
                <Row> 
                    {this.state.errorNotice ? (<Alert notice={this.state.errorNotice}/>):(null)}
                    <Col size="lg-6">
                        {this.props.courses.map((item, i)=>{
                            return (
                                <CourseListItem
                                    key = {i}
                                    course={item}
                                    getDetail = {this.viewCourseDetail}
                                />
                            )
                        })}
                    </Col>
                    <div className="col-lg-6" id="detailContainer">
                        <CourseDetail
                            selectedCourseForDetail={this.state.selectedCourseForDetail}
                        />
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Courses