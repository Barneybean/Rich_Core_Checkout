import React from "react"
import "./LogoBanner.css"
import logo from "../../assets/images/Claude_University_BG.png"
import Nav from "../Nav"


const LogoBanner = ({loginStatus}) => (
    <div id="logo" className="pt-0 mx-0 bg-white sticky-top">
        <div className="row">
            <div className="col-md-2 pl-5 align-self-center">
                <a href="/"><img src={logo} height="90px" width="90px" alt="Claude University Logo"/></a>
            </div>
            <div className="col-md-10 mt-3">
                <a href="/"><p id="UName">Claude University</p></a>
            </div>
            <a href="/login"><div id="loginState">{loginStatus}</div></a>
        </div>
        <Nav/>
    </div>
)

export default LogoBanner