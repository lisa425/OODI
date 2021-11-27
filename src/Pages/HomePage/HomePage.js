import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Timetable from '../../Components/search/Timetable'
import '../../css/Pages/HomePage/HomePage.css'
import logo from '../../Assets/image/logo/logo_blue.png'
import PopExercise from '../../Components/home/PopExercise'
import LargeButton from '../../Components/common/LargeButton'
import SmallSetting from '../../Components/home/SmallSetting'
import Navigator from '../../Components/common/Navigator'
import {BellFilled} from '@ant-design/icons'
import axios from 'axios';

const HomePage = (props) => {
    //user name,address
    const [username,setUsername] = useState('')
    const [userAddress,setUserAddress] = useState('')
    //total useable time
    const [totalTime,setTotalTime] = useState()

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
                setUserAddress(response.data.address)
            }
        }).catch((error)=>{
            console.log('error:',error)
        })

        //get total useable time
        axios.get('http://localhost:8080/timetable/getTime',config)
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                console.log('success')
                console.log(response.status)
                console.log(response.data.totalTime)
                setTotalTime(response.data.totalTime)
            }else if(response.data.message === '시간표가 없습니다.'){
                setTotalTime(response.data.totalTime)
            }
        }).catch((error)=>{
            console.log(error)
            setTotalTime(0)
        })

    },[])
    return(
        <>
        <main className="homepage">
            <header className="home-header">
                <img className="app-logo" src={logo} alt="OODI"/>
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
                    <h2>{userAddress}<br/>인기있는 운동이에요</h2>
                    <SmallSetting style={{position:'relative',right:'9px'}}>
                        <Link to='/setting/address'>위치설정</Link>
                    </SmallSetting>
                </div>
                <article className="popular-exercise-list">
                    <Link to="/search/구기종목"><PopExercise name="ball"/></Link>
                    <Link to="/search/골프"><PopExercise name="golf"/></Link>
                    <Link to="/search/수영"><PopExercise name="swim"/></Link>
                </article>
            </section>
            <LargeButton><Link to="/search/격투">수업 예약하기</Link></LargeButton>
        </main>
        <Navigator/>
        </>
    )
}

export default HomePage