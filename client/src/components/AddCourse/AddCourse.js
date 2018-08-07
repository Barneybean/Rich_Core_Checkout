import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './AddCourse.css';
import API from "../../utils/API";
import PlaceHolder from "../../assets/images/course_placeholder.png"
import {PlainInput, TextArea, FormBtn} from "../../components/Form"

const CLOUDINARY_UPLOAD_PRESET = 'o7dfgfme';
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dozulwrpg/image/upload";

class Photo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      notice: "Profile Image",
      callBackImageLink: '',
      name: "",
      courseCode: "",
      tokenValue: "",
      courseDetail: "",
      notice: "Image is required",
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      notice: "Uploading... process might take a minute"
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      console.log(response)
      if (response.body.secure_url !== '') {
        
        this.setState({
          callBackImageLink: response.body.secure_url,
        });
      
        this.setState({
          notice: "image upload success"
        })
      } else {
        this.setState({
          notice: "image upload failed, please try again with an image with smaller file size.."
        })
      } 

    })
  }

  handleInputChange = (event) =>{
    const { name, value } = event.target;
    this.setState({
        [name]: value
    })
  }

  handleAddCourse = (event) => {
    event.preventDefault();
    if (isNaN(this.state.tokenValue)) {
      alert("Token Value must be a number")
    } else {
      let newCourse = {
      name: this.state.name.trim(),
      courseCode: this.state.courseCode.trim(),
      tokenValue: this.state.tokenValue.trim(),
      courseImage: this.state.callBackImageLink.trim(),
      courseDetail: this.state.courseDetail.trim()
      }
      console.log("new",newCourse)
      API.addCourse(newCourse)
        .then(result=>{
          console.log(result)
          this.props.loadCourses()
          this.setState({
            name: "",
            courseCode: "",
            tokenValue: "",
            courseImage: "",
            courseDetail: "",
          })
        }).catch(err=>{
          console.log(err)
          alert(`Something went wrong, ErrorCode: ${err}`)
        })
    }
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*"
          >
            <div>
              {this.state.callBackImageLink === '' ? (
                <div>
                  <img src={PlaceHolder} height="195" style={{cursor: "pointer"}} alt="click me to add"/>
                  <div>{this.state.notice}</div>
                </div>
              ) :
                <div>
                  <img src={this.state.callBackImageLink} alt="click me to add"/>
                  <div>{this.state.notice}</div>
                </div>}
            </div>
          </Dropzone>
          <br/>
          <hr/>
          <PlainInput
            label="Course Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            name="name"
          />
          <PlainInput
            label="Course Code"
            value={this.state.courseCode}
            onChange={this.handleInputChange}
            name="courseCode"
          />
          <PlainInput
            label="Token Value"
            value={this.state.tokenValue}
            onChange={this.handleInputChange}
            name="tokenValue"
          />
          <TextArea
            label="Course Detail"
            value={this.state.courseDetail}
            onChange={this.handleInputChange}
            name="courseDetail"
          />
          <FormBtn
            disabled={!(this.state.name && this.state.courseCode && this.state.tokenValue && this.state.courseDetail && this.state.callBackImageLink)}
            onClick={this.handleAddCourse}
          >Add</FormBtn>
          <br/><br/>
          <p id="addNotice">{this.state.notice}</p>
        </div>
      </form>
    )
  }
}

export default Photo;