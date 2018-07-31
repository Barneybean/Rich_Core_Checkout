import React from 'react'
import "./AddedModal.css"

class AddedModal extends React.Component {
    close = (e) => {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render() {
        if (this.props.isOpen === false)
            return null

        let modalStyle = {
            position: 'absolute',
            top: '90%',
            left: "50%",
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff',
            borderRadius: "4px"
        }


        let backdropStyle = {
            position: 'absolute',
            width: '100%',
            height: '1000%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.2)'
        }

        return (
            <div className={this.props.containerClassName}>
                <div className={this.props.className} style={modalStyle}>
                    {this.props.children}
                </div>
                {!this.props.noBackdrop &&
                <div className={this.props.backdropClassName} style={backdropStyle}
                    onClick={e => this.close(e)}/>}
            </div>
        
        )
    }
}

export default AddedModal;