import React,{useState,useEffect,useRef} from 'react';
import "../../css/Components/search/ClassCalender.css";


const ClassCalendar = (props) => {
    const lessonTimes = props.lessonTimes;

    const [day,setDay] = useState('Mon')
    const [lessonList,setLessonList] = useState([])
    const showDayLessons = (e) => {
        console.log(e.target.id)
        console.log(lessonTimes)
        setDay(e.target.id)
        // setLessonList(lessonTimes[day])
        // console.log(lessonList)
    }

    //const renderLessons = 
    // useEffect(()=>{
    // },[day])
    return(
        <div className="classCalendar">
            <h3 className="month-year">Month 2021</h3>
            <section className="day-list">
                <button id="Sun" onClick={showDayLessons} style={{color:'red'}}>일</button>
                <button id="Mon" onClick={showDayLessons}>월</button>
                <button id="Tue" onClick={showDayLessons}>화</button>
                <button id="Wed" onClick={showDayLessons}>수</button>
                <button id="Thu" onClick={showDayLessons}>목</button>
                <button id="Fri" onClick={showDayLessons}>금</button>
                <button id="Sat" onClick={showDayLessons} style={{color:'#223DFF'}}>토</button>
            </section>
            <section className="lesson-time">
                <div className="lesson-time-item">
                    <h6>모집중</h6>
                    <p className="time">16:00~18:00</p>
                    <p className="price">120,000원</p>
                </div>
                <div className="lesson-time-item">
                    <h6>모집중</h6>
                    <p className="time">16:00~18:00</p>
                    <p className="price">120,000원</p>
                </div>
                <div className="lesson-time-item">
                    <h6>모집중</h6>
                    <p className="time">16:00~18:00</p>
                    <p className="price">120,000원</p>
                </div>
                <div className="lesson-time-item">
                    <h6>모집중</h6>
                    <p className="time">16:00~18:00</p>
                    <p className="price">120,000원</p>
                </div>
                <div className="lesson-time-item">
                    <h6>모집중</h6>
                    <p className="time">16:00~18:00</p>
                    <p className="price">120,000원</p>
                </div>
                <div className="lesson-time-item">
                    <h6>모집중</h6>
                    <p className="time">16:00~18:00</p>
                    <p className="price">120,000원</p>
                </div>
            </section>
        </div>
    )
}

export default ClassCalendar