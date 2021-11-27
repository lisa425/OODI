import React,{useState,useEffect} from 'react';
import LargeButton from '../../Components/common/LargeButton';
import '../../css/Pages/SearchPage/ConfirmRegister.css'
import {Link} from 'react-router-dom';
import DoneRegister from './DoneRegister'

const ConfirmRegister = (props) => {
    //예약 완료 팝업
    const [doneRegister,setDoneRegister] = useState(false);
    const handleDonePopup = () => {
        setDoneRegister(true)
    }
    
    useEffect(()=>{

    },[])
    return (
        <main className="ConfirmRegister">
            <LargeButton onClick={()=>handleDonePopup()}>결제하기</LargeButton>
            {doneRegister && <DoneRegister exercise={'원데이 맨몸필라테스'} daytime={['수요일 18:00~19:00','금요일 13:00~14:00']} setDoneRegister={setDoneRegister} setShowReservation={props.setShowReservation}/>}
        </main>
    )
}

export default ConfirmRegister