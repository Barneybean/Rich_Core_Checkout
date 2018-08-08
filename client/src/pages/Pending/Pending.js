import React, {Component} from "react"
// import API from "../../utils/API"

class Pending extends Component {

    constructor (props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount () {
        // this.handleNotifyUrl();
        console.log("pending")
    }

    handleReturnUrl = () => {
        console.log("notifyUrl")
    }


    render () {
        return (
            <div>
            <p>Processing, if not redirected in 30 second, please click link below to Home Page</p>
            <a href="/">Home page</a>
        </div>
        )
    }
}

export default Pending