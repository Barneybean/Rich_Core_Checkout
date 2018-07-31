import React, { Component } from "react"
import "./Cart.css"
import { Row, Container } from "../../components/Grid"
import CheckoutList from "../../components/CheckoutList"
import {PlainInput, FormBtn} from "../../components/Form"
import StateDrop from "../../components/StateDrop"

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tokenTotal: 0,
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            city: "",
            zipcode: "",
            state: "",
            province: "",
            country: ""
        }
    }

    componentDidMount() {
        this.sumToken();
    }

    sumToken = () => {
        console.log(this.props.addedToCart)
        let tokens = 0;
        this.props.addedToCart.map((item) => {
            return tokens += item.tokenValue
        })
        //add "," as number seperator that also support decimals
        tokens = tokens.toLocaleString()

        this.setState({
            tokenTotal: tokens
        })
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleTokenSubmit = (event) => {
        event.preventDefault();

    }

    render() {
        // console.log(this.state.state)
        return (
            <div id="cartBody">
                <Container fluid>
                    <Row>
                        <div className="col-lg-6 p-3">
                            <span id="MyCart">My Cart</span>
                            <div id="itemList">
                                {this.props.addedToCart.map((item, i) => {
                                    return (
                                        <CheckoutList
                                            key={i}
                                            courseImage={item.courseImage}
                                            name={item.name}
                                            tokenValue={item.tokenValue}
                                            courseCode={item.courseCode}
                                            addedToCart={this.props.addedToCart}
                                            deleteItemInCart={this.props.deleteItemInCart}
                                        />
                                    )
                                })}
                            </div>
                            <div id="total">
                                <span id="subtotal">Total: {this.state.tokenTotal} ClaudeCoins</span>
                            </div>
                        </div>
                        <div className="col-lg-6 p-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <PlainInput
                                        label="First Name"
                                        value={this.state.firstName}
                                        onChange={this.handleInputChange}
                                        name="firstName"
                                    />
                                    <PlainInput
                                        label="Last Name"
                                        value={this.state.lastName}
                                        onChange={this.handleInputChange}
                                        name="lastName"
                                    />
                                    <PlainInput
                                        label="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        name="email"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <PlainInput
                                        label="Address"
                                        value={this.state.address}
                                        onChange={this.handleInputChange}
                                        name="address"
                                    />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <PlainInput
                                            label="City"
                                            value={this.state.city}
                                            onChange={this.handleInputChange}
                                            name="city"
                                        />
                                        </div>
                                        <div className="col-md-6">
                                            <StateDrop
                                                state={this.state.state}
                                                handleInputChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                
                                    <PlainInput
                                        label="Province"
                                        value={this.state.province}
                                        onChange={this.handleInputChange}
                                        name="Province"
                                        placeholder="optional"
                                    />
                                    <PlainInput
                                        label="Zipcode"
                                        value={this.state.zipcode}
                                        onChange={this.handleInputChange}
                                        name="zipcode"
                                    />
                                   
                                    <FormBtn>
                                        <img src="../../assets/images/richcorelogo.png" alt="Pay With RichCore"/>
                                    </FormBtn>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Cart