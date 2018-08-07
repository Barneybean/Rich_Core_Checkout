import React from "react";
import { Col, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";

const Profile = (props) => {
    return (
        props.editing ?
            <Col md="7" className="InfoBoxRight rounded">
                <h2>Profile Information</h2> <Button color='primary' onClick={() => props.edit()}>Confirm</Button>
                <InputGroup>
                    <InputGroupAddon addonType='prepend'>password</InputGroupAddon>
                    <Input onChange={props.change} name='password' value={props.password} />
                </InputGroup>
            </Col>
            :
            <Col md="7" className="InfoBoxRight rounded">
                <h2>Profile Information</h2> 
                <br/>
                
                <h6>Email: {props.email}</h6>
            
                <br/>
                <Button color='primary' size="sm" onClick={() => props.edit()}>Edit Password</Button>
                <h6 style={{color: "green"}}>Last Action: {props.notice}</h6>
            </Col>
    )
}

export default Profile;