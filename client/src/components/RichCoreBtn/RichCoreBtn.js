import React from "react"
import "./RichCoreBtn.css"
import {FormBtn} from "../Form/FormBtn"
import RichCore from "../../assets/images/richcorelogo.png"

const RichCoreBtn = ({handleTokenSubmit, disabled}) => (
    <FormBtn
        onClick = {handleTokenSubmit}
        disabled = {disabled}
        id="richCoreBtn"
    >
        <img src={RichCore} height="50px" alt="pay with RichCore"/>
    </FormBtn>
)

export default RichCoreBtn;