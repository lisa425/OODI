import React from 'react';
import Timetable from '../../Components/home/Timetable'
import '../../css/HomePage/HomePage.css'
import PopExercise from '../../Components/home/PopExercise'
import LargeButton from '../../Components/common/LargeButton'
const HomePage = (props) => {
    return(
        <main className="homepage">
            <h1>OODI</h1>
            <Timetable />
            
            <section class="popular-exercise">
                <h2>광진구에서<br/>인기있는 운동이에요</h2>
                <article class="popular-exercise-list">
                    <PopExercise name="구기종목"/>
                    <PopExercise name="골프"/>
                    <PopExercise name="수영"/>
                </article>
            </section>
            <LargeButton>수업 예약하기</LargeButton>
        </main>
    )
}

export default HomePage