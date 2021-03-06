import React,{useState,useEffect,useRef} from 'react';
import "../../css/Components/search/ClassCalender.css";


const ClassCalendar = (props) => {
    //전체 개설 클래스 데이터
    const lessonTimes = props.lessonTimes;
    console.log(lessonTimes)
    //요일 설정
    const dayRef = useRef(false);

    //특정 요일에 오픈되어있는 클래스 리스트
    const [lessonList,setLessonList] = useState([])
    const showDayLessons = (e) => {
        e.target.style.backgroundColor="#F2F4FF"
        setLessonList(lessonTimes[e.target.id])
    }

    //사용자가 선택한 클래스 리스트를 배열에 추합
    const [selectLesson,setSelectLesson] = useState([])
    const selectLessonTime = (e,lesson,preventClick) => {
        let les = JSON.stringify(lesson)
        if(!preventClick){
            e.target.style.backgroundColor="#F2F4FF"
            setSelectLesson(selectLesson.concat(les))
            props.setSelectedLesson(selectLesson)
            
        }else{
            console.log('prevented select')
        }
    }


    //시간 정보를 시:분 형태로 변환
    const makeTimeString = (time) => {
        time = time.toString()
        let timeString = time.slice(0,2) + ":" + time.slice(2,4)
        return timeString
    } 

    const renderLessons = lessonList.map((lesson,index)=>{
        return(
            <div 
                key={index} 
                className="lesson-time-item" 
                onClick={(e)=>selectLessonTime(e,lesson,props.preventClick)}
            >
                <h6>모집중</h6>
                <p className="time">{makeTimeString(lesson.startTime)}~{makeTimeString(lesson.endTime)}</p>
                <p className="price">{lesson.price}원</p>
            </div>
        )
    })

    const renderMyLesson = () => {

    }

    
    return(
        <div className="classCalendar">
            <h3 className="month-year">Month 2021</h3>
            <section className="day-list">
                <button ref={dayRef} id="Sun" onClick={showDayLessons} style={{color:'red'}}>일</button>
                <button ref={dayRef} id="Mon" onClick={showDayLessons}>월</button>
                <button ref={dayRef} id="Tue" onClick={showDayLessons}>화</button>
                <button id="Wed" onClick={showDayLessons}>수</button>
                <button id="Thu" onClick={showDayLessons}>목</button>
                <button id="Fri" onClick={showDayLessons}>금</button>
                <button id="Sat" onClick={showDayLessons} style={{color:'#223DFF'}}>토</button>
            </section>
            <article className="lesson-time">
                {renderLessons}
            </article>
        </div>
    )
}

export default ClassCalendar