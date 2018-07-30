import React, {Component} from "react"
import "./Cart.css"
import { Row, Container } from "../../components/Grid"
import CheckoutList from "../../components/CheckoutList"


class Cart extends Component {

    render () {
        console.log("incart",this.props.addedToCart)
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