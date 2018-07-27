import React, {Component} from "react"
import "./CourseDetail.css"

class CourseDetail extends Component {
    render () {
        const {courseImage, _id, name, tokenValue, courseCode, courseDetail} = this.props.selectedCourseForDetail
        return (
          
            <div className="courseDetail">
                <img id={_id} src={courseImage} alt={name}/>
                <h5>Course Id: {courseCode}</h5>
                <h6>Course Name: {name}</h6>
                <h6>Token Value: {tokenValue}</h6>
                <p>Course Description: {courseDetail}</p>
            </div>
            
        )
    }
}

export default CourseDetail;