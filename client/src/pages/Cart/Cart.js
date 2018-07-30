import React, {Component} from "react"
import "./Cart.css"
import { Row, Container } from "../../components/Grid"
import CheckoutList from "../../components/CheckoutList"


class Cart extends Component {
    constructor () {
        super ()
        this.state={
            tokenTotal:0
        }
    }

    componentDidMount () {
        this.sumToken();
    }

    sumToken = () => {
        console.log(this.props.addedToCart)
        let tokens=0;
        this.props.addedToCart.map((item)=>{
            tokens += item.tokenValue
        })
        //add "," as number seperator that also support decimals
        tokens = tokens.toLocaleString()

        this.setState({
            tokenTotal: tokens
        })
    } 

    render () {
        return (
            <div id="cartBody">
                <Container fluid>
                    <Row>
                        <div className="col-lg-6 p-5">
                            <span id="MyCart">My Cart</span>
                            <div id="itemList">
                                {this.props.addedToCart.map((item, i)=>{
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
                            <p>Hello</p>
                        </div>
                    </Row>
                </Container>
            </div>
            
        )
    }
}

export default Cart