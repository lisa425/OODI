import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Timetable from '../../Components/home/Timetable'
import '../../css/Pages/HomePage/HomePage.css'
import PopExercise from '../../Components/home/PopExercise'
import LargeButton from '../../Components/common/LargeButton'
import SmallSetting from '../../Components/home/SmallSetting'
import Navigator from '../../Components/common/Navigator'
import {BellFilled} from '@ant-design/icons'
import axios from 'axios';

const HomePage = (props) => {
    //user name
    const [username,setUsername] = useState('')
    const [userLocation,setUserLocation] = useState('')
    //total useable time
    const [totalTime,setTotalTime] = useState()

    useEffect(()=>{
        const token = window.localStorage.getItem('TOKEN_KEY')
        console.log(token)
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        //get user name
        axios.get('http://localhost:8080/user',config)
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                setUsername(response.data.name)
                setUserLocation(response.data.address)
            }
        }).catch((error)=>{
            console.log('error:',error)
        })

        //get total useable time
        axios.get('http://localhost:8080/timetable/getTime',config)
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                setTotalTime(response.data.totalTime)
            }
        }).catch((error)=>{
            console.log('error:',error)
        })

    },[])
    return(
        <>
        <main className="homepage">
            <header className="home-header">
                <h1 className="app-logo">OODI</h1>
                <BellFilled style={{fontSize:'23px',color:'rgba(0,0,0,0.5)'}}/>
            </header>
            <div className="timetable-preview">
                <div className="preview-text">
                    <p>{username}님,</p>
                    <p><b>128시간</b>중에</p>
                    <p><span style={{color:'#223DFF',fontWeight:'bold'}}>{totalTime}시간</span>을 활용할 수 있어요!</p>
                    <SmallSetting style={{position:'absolute',right:'8%',bottom:'10%'}}>
                        <Link to='/setting/timetable'>시간설정</Link>
                    </SmallSetting>
                </div>
                <Timetable className="time-table"/>
            </div>
            
            <section className="popular-exercise">
                <div className="pop-title">
                    <h2>{userLocation}<br/>인기있는 운동이에요</h2>
                    <SmallSetting style={{position:'relative',right:'9px'}}>
                        <Link to='/setting/location'>위치설정</Link>
                    </SmallSetting>
                </div>
                <article className="popular-exercise-list">
                    <PopExercise name="ball"/>
                    <PopExercise name="golf"/>
                    <PopExercise name="swim"/>
                </article>
            </section>
            <LargeButton><Link to="/search">수업 예약하기</Link></LargeButton>
        </main>
        <Navigator/>
        </>
    )
}

export default HomePage