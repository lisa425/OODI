import React,{useState} from 'react';
import LargeButton from '../../Components/common/LargeButton'
import '../../css/Pages/SearchPage/ExerciseDetail.css'
import {Link} from 'react-router-dom';
import boxing from '../../Assets/image/boxing.jpeg';

const ExerciseDetail = (props) => {
    return(
        <main className="ExerciseDetailPage">
            <header>

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
            <section className="information"></section>
            <LargeButton>신청하기</LargeButton>
            <section className="class-schedule">

            </section>
            <section className="detail-information">
                
            </section>
        </main>
    )
}

export default ExerciseDetail