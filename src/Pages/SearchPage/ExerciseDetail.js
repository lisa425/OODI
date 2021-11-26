import React,{useState,useEffect} from 'react';
import LargeButton from '../../Components/common/LargeButton';
import Navigator from '../../Components/common/Navigator';
import '../../css/Pages/SearchPage/ExerciseDetail.css'
import DoneRegister from './DoneRegister';
import {useParams} from 'react-router-dom';
import boxing from '../../Assets/image/boxing.jpeg';
import {ClockCircleOutlined,StopOutlined,UserOutlined} from '@ant-design/icons'
import Back from '../../Components/common/Back';
import {ReactComponent as CreditCard} from '../../Assets/image/icons/creditcard.svg'
import {ReactComponent as Message} from '../../Assets/image/icons/message.svg'
import {ReactComponent as Heart} from '../../Assets/image/icons/heart.svg'
import {ReactComponent as Location} from '../../Assets/image/icons/location.svg'
import axios from 'axios';

const ExerciseDetail = (props) => {
    const classId = useParams()["classId"];
    console.log(classId)
    const [classDetail,setClassDetail] = useState([])

    useEffect(()=>{
        const token = window.localStorage.getItem('TOKEN_KEY')
        console.log(token)
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        const data = {time:[1200,1300]}
        axios.post(`http://localhost:8080/class/${classId}`,null,{headers:{"Authorization":`Bearer ${token}`}})
        .then(response => {
            console.log('hi')
            if(response.status === 200){
                console.log(response)
                setClassDetail(response.data)
                console.log(classDetail)
            }else{
                console.log('request is success,but fail')
            }
        }).catch((error)=>{
            console.log('errororor')
            console.log(error)
        })
    },[])


    
    //결제내용 확인 팝업
    const [showReservation,setShowReservation] = useState(false);
    const handleReservationPopup = () => {
        setShowReservation(true)
    }
    //예약 완료 팝업
    const [doneRegister,setDoneRegister] = useState(false);
    const handleDonePopup = () => {
        setDoneRegister(true)
    }

    return(
        <>
        <main className="ExerciseDetailPage">
            <header className="detail-header">
                <Back link="/search"/>
                <div className="header-icons">
                    <CreditCard />
                    <Message />
                    <Heart />
                </div>
            </header>
            <img className="exercise-image" src={boxing} alt="boxing"/>
            <section className="introduce">
                <div className="keyword">
                    <div>복싱</div>
                    <div>원데이클래스</div>
                </div>
                <h3>원데이 맨몸 복싱</h3>
                <p>
                    어렵다고만 느껴졌던 필라테스, 이제는 가벼운 복장과 함께
                    몸의 유연성을 늘려보는 체험을 해보세요!
                </p>
            </section>
            <section className="information">
                <h5>운동 수업 정보</h5>
                <div><ClockCircleOutlined style={{marginRight:'3px'}}/>총 40분</div>
                <div><UserOutlined style={{marginRight:'3px'}}/>최대 15명</div>
                <div>
                    <Location style={{fill:'#222222',width:'18px',height:'18px'}}/>
                    송파구 석촌동
                </div>
                <div><StopOutlined style={{marginRight:'3px'}}/>주차 불가</div>
            </section>
            <LargeButton style={{position:'fixed',bottom:'82px',zIndex:2}} onClick={()=>handleDonePopup()}>신청하기</LargeButton>
            {doneRegister && <DoneRegister exercise={'원데이 맨몸필라테스'} daytime={['수요일 18:00~19:00','금요일 13:00~14:00']} setDoneRegister={setDoneRegister}/>}
            
            <section className="class-schedule">
                <h5>수업 시작 일정</h5>
                <div className="calender">
                    datepicker
                </div>
                <div className="datetime">
                    timepicker
                </div>
            </section>
            <section className="detail-information">
                <header className="detail-information-header">
                    <div className="detail-information-content">상세정보</div>
                    <div className="detail-information-review">후기</div>
                </header>
                <article>
                    <p>안녕하세요, 4년차 현직 강사 이유진입니다!
                        <br/>
                        많은 분들이 거북목, 라운드숄더, 디스크와 같은 불편함을 느껴서 오십니다. 
                        저도 한때 직장인 생활을 하다가, 아픈 어깨를 재활로 극복한 경험이 있기에 
                        회원님들의 상태와 마음을 헤아려 효과적인 트레이닝을 진행할 수 있습니다!
                        전문적이고 과학적인 지식을 갖춘 트레이너가 되기 위해, 공인자격증 취득과 
                        휘트니스 자체 교육(주 2회)에 참가하고 있습니다.
                        <br/>
                        또한, 저 또한 보디빌더/재활트레이너 PT를 직접 받으며 몸을 관리하고 
                        최신 노하우를 전수받고 있습니다.</p>
                </article>
            </section>
        </main>
        <Navigator />
        </>
    )
}

export default ExerciseDetail