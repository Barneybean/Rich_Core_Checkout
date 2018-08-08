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
            subTotalForDisplay: 0,
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
        // console.log(this.props.addedToCart)
        let tokens = 0;
        this.props.addedToCart.map((item) => {
            return tokens += item.tokenValue
        })
        //no "," for apiurl
        this.setState({
            tokenTotal: tokens
        })
        //add "," as number seperator that also support decimal
        tokens = tokens.toLocaleString()
        this.setState({
            subTotalForDisplay: tokens
        })
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    sha256Hash = (urlunhashed) => {
        //call API and hash in server
        let hashedStr;
        let urlObj = {url: urlunhashed}
        API.hash(urlObj)
        .then(result=>{
            // console.log(result.data.hashed)
            let mainStr=`https://www.richcore.com/rich/pay/deduct?`
            hashedStr = result.data.hashed
            //add signature to url
            let finalUrlObj = {finalUrl: mainStr + urlunhashed + `&signature=${hashedStr}`}
            console.log(finalUrlObj)
            //call that API
            window.open(finalUrlObj.finalUrl)
            
        })
        .catch(err => {
            console.log(err)
            alert("hash error..")
        });
    }

    //initiate richcore payment
    handleTokenSubmit = (event) => {
        event.preventDefault();
        //add invoice numer  ############################
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
        const {tokenTotal, firstName, lastName, email} = paymentInfo
        // console.log("payment", paymentInfo)

        API.getKey()
        .then(result=>{
            // console.log(result.data.merchantKey)
            let amount = `amount=${tokenTotal}&coin=RICHT`
            let comment = `&comment=${firstName}_${lastName}_${email}_Claude_University_Course_Checkout`;
            let merchantkey = `&merchantKey=${result.data.merchantKey}`;
            let notifyUrl = `&notifyUrl=acucheckout.herokuapp.com/api/payment/success`;
            // let notifyUrl = `&notifyUrl=http://localhost:3000/api/payment/success`;
            let refNo = `&refNo=201899997777999999911`;
            let returnUrl = `&returnUrl=http://acucheckout.herokuapp.com/`
            // let returnUrl = `&returnUrl=http://localhost:3000/`
            let urlunhashed = amount + comment + merchantkey+notifyUrl+refNo+returnUrl

            // console.log(urlunhashed)

            this.sha256Hash(urlunhashed)
        }).catch(err=>{
            console.log(err)
            alert("API Error, please refresh page...If error persists, contact admin")
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
                                <span id="subtotal">Total: {this.state.subTotalForDisplay} RichCore</span>
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