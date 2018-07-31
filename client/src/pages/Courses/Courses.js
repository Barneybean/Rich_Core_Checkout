import React, {Component} from "react"
import "./Courses.css"
import { Col, Row, Container } from "../../components/Grid"
import Alert from "../../components/Alert"
import Objective from "../../components/Objective/Objective"
import CourseDetail from "../../components/CourseContents/CourseDetail"
import CourseListItem from "../../components/CourseContents/CourseListItem"
import AddedModal from "../../components/Modals/AddedModal"

class Courses extends Component {

    constructor (props) {
        super(props)
        this.state = {
            errorNotice: props.errorNotice,
        }
    }
    
    render () {
        // console.log(this.props.courses)
        // const item = this.props.selectedCourseForDetail
        // console.log(item)
        console.log(this.props.isModalOpen)
        return (
            <Container fluid>
                <Row fluid> 
                    <Objective/>
                </Row>
                <hr/>
                <AddedModal isOpen={this.props.isModalOpen} onClose={() => this.props.closeModal()}>
                        <div id="addModelBody">
                            <div className="modal-content">
                            <div className="modal-header">
                                <p>One Item Added To Cart</p>
                            </div>
                            <div className="modal-footer">
                                <a href="/cart" hidefocus="hidefocus"><button type="button" className="btn btn-primary btn-responsive">View Cart</button></a>
                                <br/>
                                <button type="button" className="btn btn-secondary btn-responsive" data-dismiss="modal" onClick={() => this.props.closeModal()}>Continue</button>
                            </div>
                            </div>
                        </div>
                </AddedModal>
                <Row> 
                    {this.state.errorNotice ? (<Alert notice={this.state.errorNotice}/>):(null)}
                    <Col size="lg-6">
                        {this.props.courses.map((item, i)=>{
                            return (
                                <CourseListItem
                                    key = {i}
                                    course={item}
                                    getDetail = {this.props.viewCourseDetail}
                                />
                            )
                        })}
                    </Col>
                    <div className="col-lg-6" id="detailContainer">
                        {this.props.selectedCourseForDetail.map((item, i) => {
                            return (<CourseDetail
                                    key={i}
                                    name={item.name}
                                    _id={item._id}
                                    courseImage={item.courseImage}
                                    tokenValue={item.tokenValue}
                                    courseDetail={item.courseDetail}
                                    courseCode={item.courseCode}
                                    addToCart={this.props.addToCart}
                                    openModal={this.props.openModal}
                                    closeModal={this.props.closeModal}
                                />
                            )
                        })}
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Courses