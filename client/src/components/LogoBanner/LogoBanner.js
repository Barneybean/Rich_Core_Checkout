import React from "react"
import "./LogoBanner.css"
import logo from "../../assets/images/Claude_University_Logo.png"
import Nav from "../Nav"
import CartIcon from "../CartIcon"


const LogoBanner = ({ cartCount, logOut, loggedInId }) => (
    // <div className="sticky-top">
    <div className="bg">
        <div id="logo" className="pt-0 mx-0 bg-white">
            <div className="row">
                <div className="col-md-8 pb-2 pt-2 align-items-center logo">
                    <a href="/"><img className="pl-2" src={logo} height="95px" width="400px" alt="America Claude University Logo" /></a>
                </div>
                {/* <span id="string">America</span> */}
                <div className="col-md-2 float-right">
                    <CartIcon
                        cartCount={cartCount}
                    />
                </div>
                <div className="col-md-2">
                    {loggedInId === "loggedOut" ? (
                        <a href="/login"><div id="loginState"><i className="fa fa-lock" aria-hidden="true"></i></div></a>
                    ) : (
                        <div>
                            <div id="loginState"
                                onClick={logOut}
                            >Log out</div>
                            <a href="/admin"><div id="adminBtn">Admin Portal</div></a>
                        </div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-lg">
                    <Nav />
                </div>
            </div>
        </div>
    </div>
)

export default LogoBanner