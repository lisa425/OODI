import React,{useState} from 'react';
import LargeButton from '../../Components/common/LargeButton';
import '../../css/Pages/SearchPage/DoneRegister.css'
import {Link} from 'react-router-dom';

const DoneRegister = (props) => {

    const handleDoneRegister = () => {
        props.setDoneRegister(false)
        props.setShowReservation(false)
    }
    return (
        <main className="DoneRegister">
            <div className="done-message">
                <p>수업이<br/>신청되었습니다!</p>
            </div>

            <section className="this-reservation">
                <h4 className="exercise-name">{props.exercise}</h4>
                <div className="daytime">{props.daytime[0]}</div>
                <div className="daytime">{props.daytime[1]}</div>
            </section>

            <LargeButton onClick={()=>handleDoneRegister()}>수업 상세페이지로 돌아가기</LargeButton>
        </main>
    )
}

export default DoneRegister