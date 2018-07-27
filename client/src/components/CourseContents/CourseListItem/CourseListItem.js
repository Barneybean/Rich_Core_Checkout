import React from "react"
import "./CourseListItem.css"

const CourseListItem = ({courseImage, name}) => (

    <div>
        <img src={courseImage} alt={name}/>
        <span>{name}</span>
    </div>
)

export default CourseListItem;