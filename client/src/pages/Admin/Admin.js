import React, {Component} from "react";
import "./Admin.css";

class Admin extends Component {

    
    
    render () {
        return (
            <div className=" admin">
                <div className="row">
                    <div className="col-lg-2 verticalNav">
                        <div id="navLink">
                            <a href="#courses" className="navItem"><h6>Courses</h6></a>
                            <a href="#orders" className="navItem"><h6>Orders</h6></a>
                            <a href="#profile" className="navItem"><h6>Setting</h6></a>
                        </div> 
                    </div>
                    <div className="col-lg-10 adminBody">
                        <section id="courses">
                            1
                        </section>
                        <section id="orders">
                            2
                        </section>
                        <section id="profile">
                            3
                        </section>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Admin