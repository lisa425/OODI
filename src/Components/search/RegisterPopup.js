import React,{useState} from 'react';
import LargeButton from '../common/LargeButton'
import ClassCalender from './ClassCalender';
import {CloseOutlined} from '@ant-design/icons'
import "../../css/Components/search/RegisterPopup.css";

const RegisterPopup = (props) => {
    const [selectedLesson,setSelectedLesson] = useState([])
    const [selectedHopeDate,setSelectedHopeDate] = useState('')

    //선택한 데이터 제출
    const submitSelectedData = () => {
        console.log(`hope date is:${selectedHopeDate}`)
        console.log(`selectedTime is:${selectedLesson}`)
        let selectedData = {
            lesson:selectedLesson,
            hopedate:selectedHopeDate
        }
        console.log(`selectedData-register popup:${selectedData}`)
        props.setRegisterData(selectedData)
    }

    //현재 팝업 닫기
    const closeThisPopup = () => {
        props.setRegisterPopup(false)
    }

    //신청창 팝업 오픈
    const handleRegisterPopup = () => {
        submitSelectedData()
        props.setShowReservation(true)
        closeThisPopup()
    }

    const renderStartDate = props.startDate.map((date,index) => {
        return(
            <option 
                key={index} 
                value={date} 
                onClick={(e)=>setSelectedHopeDate(e.target.value)}
            >
                {date}
            </option>
        )
    })

    return(
        <div className="register-popup">
            <header>
                <h2>신청</h2>
                <CloseOutlined 
                    className="close" 
                    onClick={()=>closeThisPopup()}/>
            </header>
            <ClassCalender 
                lessonTimes={props.lessonTimes} 
                setSelectedLesson={setSelectedLesson}
            />
            <section className="hope-startDate">
                <h3>희망 시작 날짜 선택</h3>
                <select id="startDate" name="startDate">
                    {renderStartDate}
                </select>
            </section>
            <section className="my-timelist">
                <h3>나의 수업 시간표</h3>
                <article className="my-timelist-wrapper">
                    <div>월요일 12:00~13:00</div>
                    <div>수요일 12:00~13:00</div>
                </article>
            </section>
            <LargeButton onClick={()=>handleRegisterPopup()}>신청하기</LargeButton>
        </div>
    )
}

export default RegisterPopup