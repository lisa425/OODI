import React,{useState} from 'react';

const ClassCalendar = (props) => {

    return(
        <div className="classCalendar">
            <h3 className="month-year">Month 2021</h3>
            <section className="day-list">
                <button>일</button>
                <button>월</button>
                <button>화</button>
                <button>수</button>
                <button>목</button>
                <button>금</button>
                <button>토</button>
            </section>
            <section className="lesson-time">
                
            </section>
        </div>
    )
}

export default ClassCalendar