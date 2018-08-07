import React from "react"
import "./AdminCourseList.css"
import DelBtn from "../../components/DelBtn"

const AdminCourseList = ({editing, courseCode, courseImage, name, tokenValue, courseDetail, deleteCourse, _id}) => {

    return (
        {editing} ? (
            <div >
                <div className="clearfix">
                    <img className="classImg" src={courseImage} alt={name} width="170" height="170" />
                    <ul>
                        <li><strong>Course Name:</strong> {name}</li>
                        <li><strong>Course Code:</strong> {courseCode}</li>
                        <li><strong>Course Token</strong> Value: {tokenValue}</li>
                        <li id="courseDetail"><strong>Course Detail:</strong> {courseDetail}</li>
                    </ul>
                <DelBtn 
                    onClick={()=>{deleteCourse(_id)}}
                />
                </div>
            </div>
        ) : (
            <div className="clearfix">
                <img className="classImg" src={courseImage} alt={name} width="170" height="170" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum...
            </div>
        )
    )
    
}

export default AdminCourseList;
