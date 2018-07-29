import React from "react"
import "./CourseDetail.css"

// const CourseDetail = ({ courseImage, _id, name, tokenValue, courseCode, courseDetail }) => (
const CourseDetail = (props) => {
    const {courseImage, _id, name, tokenValue, courseCode, courseDetail} = props
    return (
        <div id="detailDisplay">
            {courseImage ? (
                <div className="courseDetail">
                    <img id={_id} src={courseImage} alt={name}/>
                    <hr/>
                    <button type="button" className="btn btn-raised btn-danger"
                        onClick={()=>{this.props.addToCart(this.props.selectedCourseForDetail)}}
                    >Add To Cart</button>
                </div>
            ):( 
                <div className="courseDetail">
                    <img id="default" src="https://res.cloudinary.com/dozulwrpg/image/upload/v1532735508/Bitcoin.jpg" alt="default"/>
                    <hr/>
                    <button type="button" className="btn btn-raised btn-danger"
                        onClick={()=>{this.props.addToCart(this.props.selectedCourseForDetail)}}
                    >Add To Cart</button>
                </div>
            )}
            <h5>Course Name: {name}</h5>
            <h6>Course Id: {courseCode}</h6>
            <h6>Token Value: {tokenValue} RichCore</h6>
            <h6>Course Description:</h6>
            <p>{courseDetail}</p>
        </div>
    )
}

export default CourseDetail;