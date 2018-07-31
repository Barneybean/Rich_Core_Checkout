import React, { Component } from "react"
import "./CourseDetail.css"

class CourseDetail extends Component {
    
    click = (courseImage, _id, name, tokenValue, courseCode)=>{
        this.props.addToCart(courseImage, _id, name, tokenValue, courseCode)
        this.props.openModal()
    }

    render() {
        const { courseImage, _id, name, tokenValue, courseCode, courseDetail} = this.props
        return (
            <div id="detailDisplay">
                {courseImage ? (
                    <div className="courseDetail">
                        <img id={_id} src={courseImage} alt={name} />
                        <hr />
                        <button type="button" className="btn btn-raised btn-danger"
                            onClick={() => { this.click(courseImage, _id, name, tokenValue, courseCode) }}
                        >Add To Cart</button>
                    </div>
                ) : (
                        <div className="courseDetail">
                            <img id="default" src={courseImage} alt="default" />
                            <hr />
                            <button type="button" className="btn btn-raised btn-danger"
                            onClick={() => { this.click(courseImage, _id, name, tokenValue, courseCode) }}
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

}

export default CourseDetail;