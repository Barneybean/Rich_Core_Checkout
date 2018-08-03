import React from "react"
import "./RichCoreBtn.css"
import {FormBtn} from "../Form/FormBtn"

const RichCoreBtn = ({handleTokenSubmit, disabled}) => (
    <FormBtn
        onClick = {handleTokenSubmit}
        disabled = {disabled}
        id="richCoreBtn"
    >
        <img src="https://res.cloudinary.com/dozulwrpg/image/upload/v1533320532/richcorelogo.png" height="50px" alt="pay with RichCore"/>
    </FormBtn>
)

export default RichCoreBtn;