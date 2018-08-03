import React, {Component} from "react";
import "./Admin.css";
import { Container } from "../../components/Grid";

class Admin extends Component {

    
    
    render () {
        return (
            <Container fluid>
                <div className="row">
                    <div className="col-lg-2 VerticalNav">
                        <a href=""><h5>Courses</h5></a>
                        <a href=""><h5>Orders</h5></a>
                        <a href=""><h5>Setting</h5></a>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Admin