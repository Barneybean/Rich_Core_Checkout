import React, { Component } from "react"
import "./Cart.css"
import { Row, Container } from "../../components/Grid"
import CheckoutList from "../../components/CheckoutList"
import {PlainInput} from "../../components/Form"
import StateDrop from "../../components/StateDrop"
import RichCoreBtn from "../../components/RichCoreBtn"
import API from "../../utils/API"

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
        //add "," as number seperator that also support decimal
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

    sha256Hash = (string) => {
        //call API and hash in server
    }

    //initiate richcore payment
    handleTokenSubmit = (event) => {
        event.preventDefault();
        let paymentInfo = {
            tokenTotal: this.state.tokenTotal,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            state: this.state.state,
            province: this.state.province,
        }
        // console.log("payment", paymentInfo)

        let urlunhashed="";
        this.sha256Hash(urlunhashed)
        .then(result=>{
            console.log(result)
        })
        .catch(err => {
            console.log(err)
            alert("payment err, please check your Rich Core balnce and try again")
        });

        API.richCorePayment()
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
            alert("payment err, please check your Rich Core balnce and try again")
        })
    }
    
    render() {
        // console.log(this.state.state)
        return (
            <div id="cartBody">
                <Container fluid>
                    <Row>
                        <div className="col-lg-6 p-3">
                            <span className="header">My Cart</span>
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
                            <span className="header">Checkout</span>
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
                                        label="Province "
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
                                    <RichCoreBtn
                                        disabled={!(this.state.firstName && this.state.lastName && this.state.email)}
                                        handleTokenSubmit={this.handleTokenSubmit}
                                    />
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