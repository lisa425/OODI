import React,{useState,useEffect} from 'react';
import LargeButton from '../../Components/common/LargeButton';
import Navigator from '../../Components/common/Navigator';
import '../../css/Pages/SearchPage/ExerciseDetail.css'
import ConfirmRegister from './ConfirmRegister';
import {useParams} from 'react-router-dom';
import boxing from '../../Assets/image/boxing.jpeg';
import {ClockCircleOutlined,CarOutlined,UserOutlined} from '@ant-design/icons'
import Back from '../../Components/common/Back';
import {ReactComponent as CreditCard} from '../../Assets/image/icons/creditcard.svg'
import {ReactComponent as Message} from '../../Assets/image/icons/message.svg'
import {ReactComponent as Heart} from '../../Assets/image/icons/heart.svg'
import {ReactComponent as Location} from '../../Assets/image/icons/location.svg'
import axios from 'axios';
import RegisterPopup from '../../Components/search/RegisterPopup';
import ClassCalender from '../../Components/search/ClassCalender';

const ExerciseDetail = (props) => {
    //클래스 id
    const classId = useParams()["classId"];
    //클래스 객체 
    const [classDetail,setClassDetail] = useState([])
    //주차 여부
    const [parking,setParking]=useState('');

    useEffect(()=>{
        const token = window.localStorage.getItem('TOKEN_KEY')
        console.log(token)
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        const data = {}

        axios.post(`http://localhost:8080/class/${classId}`,data,{headers:{"Authorization":`Bearer ${token}`}})
        .then(response => {
            if(response.status === 200){
                setClassDetail(response.data)
                //주차 여부 설정
                switch(response.data.parking){
                    case "no":
                        setParking('주차 불가');
                        break;
                    case "yes":
                        setParking('주차 가능');
                        break;
                }

                console.log(classDetail)
            }else{
                console.log('request is success,but fail')
            }
        }).catch((error)=>{
            console.log(error)
        })
    },[])


    
    //결제내용 확인 팝업
    const [showReservation,setShowReservation] = useState(false);

    //클래스 선택 팝업
    const [registerPopup,setRegisterPopup] = useState(false);
    const handleSelectLessonPopup = () => {
        setRegisterPopup(true)
    }
    //선택 팝업에서 선택한 데이터
    const [registerData,setRegisterData] = useState({})
    useEffect(()=>{
        console.log(registerData)
    },[registerData])

    return(
        <>
        <main className="ExerciseDetailPage">
            <header className="detail-header">
                <Back link={`/search/${classDetail.category}`}/>
                <div className="header-icons">
                    <CreditCard />
                    <Message />
                    <Heart />
                </div>
            </header>
            <img className="exercise-image" src={boxing} alt="boxing"/>
            <section className="introduce">
                <div className="keyword">
                    <div>{classDetail.subCategory}</div>
                    <div>{classDetail.type}</div>
                </div>
                <h3>{classDetail.title}</h3>
                <p>
                    {classDetail.description}
                </p>
            </section>
            <section className="information">
                <h5>운동 수업 정보</h5>
                <div><ClockCircleOutlined style={{marginRight:'3px'}}/>총 {classDetail.totalTime}분</div>
                <div><UserOutlined style={{marginRight:'3px'}}/>최대 {classDetail.maxCapacity}명</div>
                <div>
                    <Location style={{fill:'#222222',width:'18px',height:'18px'}}/>
                    {classDetail.address}
                </div>
                <div><CarOutlined style={{marginRight:'3px'}}/>
                    {parking}
                </div>
            </section>
            <LargeButton style={{position:'fixed',bottom:'82px',zIndex:2}} onClick={()=>handleSelectLessonPopup()}>예약하기</LargeButton>
            
            {/* 예약하기 눌렀을 때 */}
            {registerPopup && 
                <RegisterPopup 
                    setShowReservation={setShowReservation} 
                    setRegisterPopup={setRegisterPopup} 
                    lessonTimes={classDetail.lessonTimes}
                    startDate={classDetail.startDate}
                    setRegisterData={setRegisterData}
                />}
            
            
            {/*신청하기 입력하기 눌렀을 때*/}
            {showReservation && 
                <ConfirmRegister 
                    setShowReservation={setShowReservation} 
                    classId={classId}
                    registerData={registerData}
                />}
            
            <section className="class-schedule">
                <h5>수업 시작 일정</h5>
                <ClassCalender lessonTimes={classDetail.lessonTimes} preventClick={true} />
            </section>
            <section className="detail-information">
                <header className="detail-information-header">
                    <div className="detail-information-content">상세정보</div>
                    <div className="detail-information-review">후기</div>
                </header>
                <article>
                    <p>{classDetail.detail}</p>
                </article>
            </section>
        </main>
        <Navigator />
        </>
    )
}

export default ExerciseDetail