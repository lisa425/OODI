import React from 'react';
import Timetable from '../../Components/home/Timetable'
import LargeButton from '../../Components/common/LargeButton'
import {Link} from 'react-router-dom';
const TimeTablePage = (props) => {
    return(
        <main className="timetablepage">
            <div>
                <Link to='/'>&lt;</Link>
                <h1 className="page-title">공강 시간 입력</h1>
            </div>
            <p>128시간 중에 
                <span style={{color:'#223DFF',fontWeight:'bold'}}>7시간</span>
            을 활용할 수 있어요!</p>
            <Timetable/>
            <LargeButton>저장하기</LargeButton>
        </main>
    )
}

export default TimeTablePage