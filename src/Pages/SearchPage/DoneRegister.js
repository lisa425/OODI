import React,{useState} from 'react';
import LargeButton from '../../Components/common/LargeButton';
import '../../css/Pages/SearchPage/DoneRegister.css'
import {Link} from 'react-router-dom';
import {CheckCircleOutlined} from '@ant-design/icons'
const DoneRegister = (props) => {

    const handleDoneRegister = () => {
        props.setDoneRegister(false)
        props.setShowReservation(false)
    }
    return (
        <main className="DoneRegister">
            <div className="done-message">
                <CheckCircleOutlined style={{fontSize:'55px'}}/>
                <h1>수업이 신청되었습니다!</h1>
            </div>

            <h3>예약 내역</h3>
            <section className="this-reservation">
                <div className="lesson-name">
                    <h4>{props.exercise}</h4>
                    <p className="content">{props.daytime[0]}</p>
                    <p className="content">{props.daytime[1]}</p>
                </div>
                <div className="hope-date">
                    <h4>희망 시작 날짜</h4>
                    <p className="content">2021-12-12{props.hopedate}</p>
                </div>
                <div className="username">
                    <h4>이름</h4>
                    <p className="content">{props.username}</p>
                </div>
                <div className="phone-number">
                    <h4>전화번호</h4>
                    <p className="content">{props.phoneNumber}</p>
                </div>
            </section>

            <LargeButton onClick={()=>handleDoneRegister()}>수업 상세페이지로 돌아가기</LargeButton>
        </main>
    )
}

export default DoneRegister