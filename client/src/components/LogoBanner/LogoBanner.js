import React from "react"
import "./LogoBanner.css"
import logo from "../../assets/images/Claude_University_Logo.png"
import Nav from "../Nav"


const LogoBanner = ({loginStatus}) => (
    <div>
        <div id="logo" className="pt-0 mx-0 bg-white sticky-top">
            <div className="row">
                <div className="col-md-8 pb-2 pt-2 align-items-center logo">
                    <a href="/"><img src={logo} height="80px" width="460px" alt="Claude University Logo"/></a>
                </div>
                <div className="col-md-4">
                    <a href="/login"><div id="loginState">{loginStatus}</div></a>
                </div>
            </div>
            <div className="row">
                <div className="col-lg">
                    <Nav/>
                </div>
            </div>
        </div>
    </div>
)

export default LogoBanner