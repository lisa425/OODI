import React from 'react';
import Timetable from '../../Components/home/Timetable'
import '../../css/Pages/HomePage/HomePage.css'
import PopExercise from '../../Components/home/PopExercise'
import LargeButton from '../../Components/common/LargeButton'
import SmallSetting from '../../Components/home/SmallSetting'
import Navigator from '../../Components/common/Navigator'

const HomePage = (props) => {
    return(
        <main className="homepage">
            <h1 className="app-logo">OODI</h1>
            <div className="timetable-preview">
                <p>채원님,</p>
                <p><b>128시간</b>중에</p>
                <p><span style={{color:'#223DFF',fontWeight:'bold'}}>7시간</span>을 활용할 수 있어요!</p>
                <SmallSetting style={{position:'absolute',right:'10px',bottom:'15px'}}>시간설정</SmallSetting>
                <Timetable/>
            </div>
            
            <section className="popular-exercise">
                <div className="pop-title">
                    <h2>광진구에서<br/>인기있는 운동이에요</h2>
                    <SmallSetting style={{position:'relative',right:'9px'}}>위치설정</SmallSetting>
                </div>
                <article className="popular-exercise-list">
                    <PopExercise name="구기종목"/>
                    <PopExercise name="골프"/>
                    <PopExercise name="수영"/>
                </article>
            </section>
            <LargeButton>수업 예약하기</LargeButton>
            <Navigator/>
        </main>
    )
}

export default HomePage