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

    //initiate richcore payment
    handleTokenSubmit = (event) => {
        event.preventDefault();
        //add invoice numer  ############################
        let courseIds = [];
        this.props.addedToCart.forEach((item)=>{
            courseIds.push(item._id)
        })
        
        // console.log(courseIds);

        let paymentInfo = {
            courseIds: courseIds,
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
        
        this.getMerchantKey(paymentInfo);
    }

    getMerchantKey = (paymentInfo) => {

        API.getKey()
        .then(result=>{
            // console.log(result.data.merchantKey)
            paymentInfo.merchantKey = result.data.merchantKey;
            this.getRefNo(paymentInfo)
        }).catch(err=>{
            console.log(err)
            alert("Merchantkey Error, please refresh page...If error persists, contact admin")
        })
    }

    getRefNo = (paymentInfo) => {
       
        API.getRefNo()
        .then( result =>{
            // console.log("refNo", result);
            paymentInfo.referenceNo = result.data.refNo;
            //to hashed comments into string then decrypt from return Url
            this.createOrder(paymentInfo)
        }).catch(err=>{
            console.log(err)
            alert("refNo Hashing Error, please refresh page...If error persists, contact admin")
        })
        
    }

    createOrder = (paymentInfo) => {
        let order = {
            refNo: paymentInfo.referenceNo,
            firstName: paymentInfo.firstName,
            lastName: paymentInfo.lastName,
            email: paymentInfo.email,
            courseIds: paymentInfo.courseIds,
            address: paymentInfo.address,
            city: paymentInfo.city,
            state: paymentInfo.state,
            province: paymentInfo.province,
            zip_code: paymentInfo.zipcode,
        }
        // console.log(order)
        API.initiateOrder(order) 
        .then(result => {
            // console.log(result)
            // validate email
            if (result.data.errors) {
                alert(result.data.message)
            } else {
                // console.log("comment", result.data)
                // console.log("payment", paymentInfo)
                const {tokenTotal, merchantKey, referenceNo} = paymentInfo
                // let amount = `amount=${tokenTotal}&coin=RICHT`
                let amount = `amount=${tokenTotal}&coin=RCTFF`
                //hash course id arr and use as comment then decipher in return url  #########
                let comment = `&comment=${referenceNo}`;
                let merchantkey = `&merchantKey=${merchantKey}`;
                // let notifyUrl = `&notifyUrl=acucheckout.herokuapp.com/api/payment/success`;
                //notify url will use post return url uses get
                let notifyUrl = `&notifyUrl=http://localhost:3002/api/payment/success/`;
                // have a increment value in hash url                                ###########
                let refNo = `&refNo=${referenceNo}`;
                // let returnUrl = `&returnUrl=http://acucheckout.herokuapp.com/api/payment/success/`
                let returnUrl = `&returnUrl=http://localhost:3002/api/payment/success/`
                let urlunhashed = amount + comment + merchantkey+notifyUrl+refNo+returnUrl

                // console.log(urlunhashed)

                this.sha256Hash(urlunhashed)
            }
        }).catch(err=>{
            console.log(err)
            alert("Order Creation Error, please refresh page...If error persists, contact admin")
        })
        
        
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
            // console.log(finalUrlObj.finalUrl)
            this.popitup(finalUrlObj.finalUrl, "RichCore Payment");
        })
        .catch(err => {
            console.log(err)
            alert("hash error..")
        });
    }

    popitup = (url,windowName) => {
        let newwindow=window.open(url,windowName,'height=900,width=1100');
        if (window.focus) {newwindow.focus()}
        return false;
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
                                        name="province"
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


