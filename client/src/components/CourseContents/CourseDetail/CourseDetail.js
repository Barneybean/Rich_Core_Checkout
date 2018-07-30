import React from "react"
import "./CourseDetail.css"

const CourseDetail = (props) => {
    const {courseImage, _id, name, tokenValue, courseCode, courseDetail, addToCart} = props
    console.log(courseCode)
    return (
        <div id="detailDisplay">
            {courseImage ? (
                <div className="courseDetail">
                    <img id={_id} src={courseImage} alt={name}/>
                    <hr/>
                    <button type="button" className="btn btn-raised btn-danger"
                        onClick={()=>{addToCart(courseImage, _id, name, tokenValue, courseCode)}}
                    >Add To Cart</button>
                </div>
            ):( 
                <div className="courseDetail">
                    <img id="default" src={courseImage} alt="default"/>
                    <hr/>
                    <button type="button" className="btn btn-raised btn-danger"
                        onClick={()=>{addToCart(courseImage, _id, name, tokenValue, courseCode)}}
                    >Add To Cart</button>
                </div>
            )}
            <h5>Course Name: {name}</h5>
            <h6>Course Id: {courseCode}</h6>
            <h6>Token Value: <span>{tokenValue}</span> RichCore</h6>
            <h6>Course Description:</h6>
            <p>{courseDetail}</p>
        </div>
    )
}

export default CourseDetail;