import React, {Component} from "react";
import "./Admin.css";
import Profile from "../../components/Profile"

class Admin extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            editing: false
        }
    }
    
    render () {
        return (
            <div className=" admin">
                <div className="row">
                    <div className="col-lg-2 verticalNav">
                        <div id="navLink">
                            <a href="#courses" className="navItem"><h6>Courses</h6></a>
                            <br/>
                            <a href="#orders" className="navItem"><h6>Orders</h6></a>
                            <br/>
                            <a href="#profile" className="navItem"><h6>Setting</h6></a>
                        </div> 
                    </div>
                    <div className="col-lg-10 adminBody">
                        <section id="courses">
                            add courses
                        </section>
                        <section id="orders">
                            view orders
                        </section>
                        <section id="profile">
                            <Profile
                                editing={this.state.editing}
                            />
                        </section>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Admin