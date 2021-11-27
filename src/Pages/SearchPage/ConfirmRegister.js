import React,{useState,useEffect} from 'react';
import LargeButton from '../../Components/common/LargeButton';
import '../../css/Pages/SearchPage/ConfirmRegister.css'
import {Link} from 'react-router-dom';
import Back from '../../Components/common/Back';
import DoneRegister from './DoneRegister'
import axios from 'axios'
import {CloseOutlined} from '@ant-design/icons'
const ConfirmRegister = (props) => {
    //예약 완료 팝업
    const [doneRegister,setDoneRegister] = useState(false);
    const handleDonePopup = () => {
        setDoneRegister(true)
    }
    
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
                console.log('success:',response.data)
                console.log(props.classId)
                setUsername(response.data.name)
                setPhoneNumber(response.data.phoneNumber)
            }
        }).catch((error)=>{
            console.log('error:',error)
        })
    },[])
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

            <section className="selected-class">
                <div className="class">
                    <h5>{props.classOwner}</h5>
                    <div>
                        {props.lessonTime}
                    </div>
                </div>
                <div className="date">
                    <h5>희망 시작 날짜</h5>
                    <p>{props.selecedStartDate}</p>
                </div>
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
            {doneRegister && <DoneRegister exercise={'원데이 맨몸필라테스'} daytime={['수요일 18:00~19:00','금요일 13:00~14:00']} setDoneRegister={setDoneRegister} setShowReservation={props.setShowReservation}/>}
        </main>
    )
}

export default ConfirmRegister