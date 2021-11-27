import React,{useState,useEffect} from 'react';
import LargeButton from '../../Components/common/LargeButton';
import '../../css/Pages/SearchPage/ConfirmRegister.css'
import {Link} from 'react-router-dom';
import Back from '../../Components/common/Back';
import DoneRegister from './DoneRegister'
import axios from 'axios'
import {CloseOutlined} from '@ant-design/icons'
const ConfirmRegister = (props) => {
    //예약 데이터 분리
    const selectedDate = props.registerData;
    const selectedDay = selectedDate.lesson;

    console.log("registerData:",selectedDate)
    //예약 완료 팝업
    const [doneRegister,setDoneRegister] = useState(false);
    const handleDonePopup = () => {
        submitReservation();
        setDoneRegister(true)
    }

    const classId = parseInt(props.classId)
    
    //유저 정보 설정
    const [username,setUsername] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    useEffect(()=>{
        const token = window.localStorage.getItem('TOKEN_KEY')
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };
        //get user name
        axios.get('http://localhost:8080/user',config)
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                setUsername(response.data.name)
                setPhoneNumber(response.data.phoneNumber)
            }
        }).catch((error)=>{
            console.log('error:',error)
        })
    },[])

    const renderLessonTime = selectedDay.map((lessonTime,index)=>{
        console.log(lessonTime)
        return(
            <p>{lessonTime["day"]} {lessonTime["startTime"]}~{lessonTime["endTime"]}</p>
        )
    })

    const submitReservation = () => {
        const token = window.localStorage.getItem('TOKEN_KEY')
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        let data = {
            classTimeId:[classId],
            startDate:selectedDate.hopedate
        }
        axios.post(`http://localhost:8080/reservation/${classId}`,data,config)
        .then(response => {
            if(response.status === 201){
                console.log('예약 완료')
            }else{
                console.log('엥 예약 이상함')
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <main className="ConfirmRegister">
            <header>
                <CloseOutlined onClick={()=>props.setShowReservation(false)}/>
            </header>

            <section className="username">
                <h3>이름</h3>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </section>
            <section className="phone-number">
                <h3>전화번호</h3>
                <input type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </section>

            <section>
                <h3>신청 내용</h3>
                <article className="selected-class">
                    <div className="class">
                        <h5>{props.classOwner}</h5>
                        <div>
                            {renderLessonTime}
                        </div>
                    </div>
                    <div className="date">
                        <h5>희망 시작 날짜</h5>
                        <div>{selectedDate.hopedate}</div>
                    </div>
                </article>
            </section>

            <section className="payment">
                <h3>결제 방법</h3>
                <div className="payment-type">
                    <div>무통장입금</div>
                    <div>신용카드</div>
                    <div>포인트</div>
                </div>
            </section>
            <LargeButton onClick={()=>handleDonePopup()}>결제하기</LargeButton>
            {doneRegister && 
                <DoneRegister 
                    exercise={'원데이 맨몸필라테스'} 
                    daytime={['수요일 18:00~19:00','금요일 13:00~14:00']} 
                    username={username}
                    phoneNumber={phoneNumber}
                    hopedate={selectedDate.hopedate}
                    setDoneRegister={setDoneRegister} 
                    setShowReservation={props.setShowReservation}
                />
            }
        </main>
    )
}

export default ConfirmRegister