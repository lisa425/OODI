import React from 'react';
import {Link} from 'react-router-dom';
import Timetable from '../../Components/home/Timetable'
import '../../css/Pages/HomePage/HomePage.css'
import PopExercise from '../../Components/home/PopExercise'
import LargeButton from '../../Components/common/LargeButton'
import SmallSetting from '../../Components/home/SmallSetting'
import Navigator from '../../Components/common/Navigator'
import {BellFilled} from '@ant-design/icons'

const HomePage = (props) => {

    return(
        <>
        <main className="homepage">
            <header className="home-header">
                <h1 className="app-logo">OODI</h1>
                <BellFilled style={{fontSize:'23px',color:'rgba(0,0,0,0.5)'}}/>
            </header>
            <div className="timetable-preview">
                <p>채원님,</p>
                <p><b>128시간</b>중에</p>
                <p><span style={{color:'#223DFF',fontWeight:'bold'}}>7시간</span>을 활용할 수 있어요!</p>
                <SmallSetting style={{position:'absolute',right:'10px',bottom:'15px'}}>
                    <Link to='/setting/timetable'>시간설정</Link>
                </SmallSetting>
                <Timetable/>
            </div>
            
            <section className="popular-exercise">
                <div className="pop-title">
                    <h2>광진구에서<br/>인기있는 운동이에요</h2>
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