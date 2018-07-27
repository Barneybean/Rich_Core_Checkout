import React from "react"
import "./CourseListItem.css"

const CourseListItem = ({course, getDetail}) => (

    <div className="courseImage">
        <img src={course.courseImage} alt={course.name} onClick={()=>{getDetail(course)}}/>
        <p className="courseTitle">{course.name}</p>
    </div>
)

export default CourseListItem;