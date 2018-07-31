import React from "react"
import "./RichCoreBtn.css"
import {FormBtn} from "../Form/FormBtn"

const RichCoreBtn = ({handleTokenSubmit, disabled}) => (
    <FormBtn
        onClick = {handleTokenSubmit}
        disabled = {disabled}
    >
        <img src="../../assets/images/richcorelogo.png" alt="pay with RichCore"/>
    </FormBtn>
)

export default RichCoreBtn;