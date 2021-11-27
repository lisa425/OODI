import React,{useState} from 'react';
import LargeButton from '../common/LargeButton'
import ClassCalender from './ClassCalender';
import {CloseOutlined} from '@ant-design/icons'
import "../../css/Components/search/RegisterPopup.css";

const RegisterPopup = (props) => {
    const closeThisPopup = () => {
        props.setSelectLesson(false) //현재 팝업 닫기
    }
    const handleRegisterPopup = () => {
        props.setShowReservation(true) //신청창 팝업 오픈
        closeThisPopup()
    }
    return(
        <div className="register-popup">
            <header>
                <h3>신청</h3>
                <CloseOutlined className="close" onClick={()=>closeThisPopup()}/>
            </header>
            <ClassCalender/>
            <LargeButton onClick={()=>handleRegisterPopup()}>신청하기</LargeButton>
        </div>
    )
}

export default RegisterPopup