import React, { Component } from "react"
import "./Home.css"
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

class Home extends Component {

    state = {

    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                           
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;