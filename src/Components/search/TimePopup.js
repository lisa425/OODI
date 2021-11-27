import React,{useState,useEffect} from 'react';
import ScheduleSelector from 'react-schedule-selector'
import "../../css/Components/search/TimePopup.css";
import {CloseOutlined} from '@ant-design/icons'
import LargeButton from '../common/LargeButton'
import axios from 'axios'
import Timetable from './Timetable'

const TimePopup = (props) => {

    //요일별 가능 시간을 담는 배열
    const [monTimeList,setMonTimeList] = useState([])
    const [tueTimeList,setTueTimeList] = useState([])
    const [wedTimeList,setWedTimeList] = useState([])
    const [thuTimeList,setThuTimeList] = useState([])
    const [friTimeList,setFriTimeList] = useState([])
    const [satTimeList,setSatTimeList] = useState([])
    const [sunTimeList,setSunTimeList] = useState([])

     //타임테이블 객체 handling
    const [schedule,setSchedule] = useState([])

    //타임테이블 요일별 리스트로 분리
    const devideDayTimeList = () => {
        let day,time;
        if(schedule.length > 0){
            //state 배열에 concat()으로 아이템 추가를 하기 위한 임시 배열
            let mon_time_list = [];
            let tue_time_list = [];
            let wed_time_list = [];
            let thu_time_list = [];
            let fri_time_list = [];
            let sat_time_list = [];
            let sun_time_list = [];

            for(let i=0;i<schedule.length;i++){
                day = schedule[i].toString().substr(0,3);
                time = parseInt(schedule[i].toString().substr(16,5).replace(':',''))

                switch(day){
                    case 'Mon':
                        mon_time_list = mon_time_list.concat(time)
                        setMonTimeList(mon_time_list)
                        break;
                    case 'Tue':
                        tue_time_list = tue_time_list.concat(time)
                        setTueTimeList(tue_time_list)
                        break;
                    case 'Wed':
                        wed_time_list = wed_time_list.concat(time)
                        setWedTimeList(wed_time_list)
                        break;
                    case 'Thu':
                        thu_time_list = thu_time_list.concat(time)
                        setThuTimeList(tue_time_list)
                        break;
                    case 'Fri':
                        fri_time_list = fri_time_list.concat(time)
                        setFriTimeList(fri_time_list)
                        break;
                    case 'Sat':
                        sat_time_list = sat_time_list.concat(time)
                        setSatTimeList(sat_time_list)
                        break;
                    case 'Sun':
                        sun_time_list = sun_time_list.concat(time)
                        setSunTimeList(sun_time_list)
                        break;
                    default:
                        console.log('Its not date');
                        break;
                }
            }  
        }
    }
    const handleChange = (newSchedule) => {
        setSchedule(newSchedule)
        devideDayTimeList();
    }

    const setAbleTimeList = () => {
        devideDayTimeList();
        const ableTimeList = [
            {
                'day':'Mon',
                'timeList':monTimeList
            },
            {
                'day':'Tue',
                'timeList':tueTimeList
            },
            {
                'day':'Wed',
                'timeList':wedTimeList
            },
            {
                'day':'Thu',
                'timeList':thuTimeList
            },
            {
                'day':'Fri',
                'timeList':friTimeList
            },
            {
                'day':'Sat',
                'timeList':satTimeList
            },
            {
                'day':'Sun',
                'timeList':sunTimeList
            },
        ]
        return ableTimeList;
    }

    const submitTimetable = () => {
        const ableTimeList = setAbleTimeList();
        console.log("사용가능 시간:",ableTimeList)
        props.setSelectedTime(ableTimeList)
        // closePopup();
    }
    
    const closePopup = () => {
        props.setIsTime(false)
    }
    
    return(
        <div className='time-popup'>
            <div className='page-title'>
                <CloseOutlined onClick={()=>closePopup()}/>
                <div className='page-title-text'>
                    <h1>시간</h1>
                    <p className='useable-time'>
                        공강 시간표에서 원하는 수업시간을 선택해주세요.
                    </p>
                </div>
            </div>
            <div className="time-table">
                <Timetable id="userTable"/>
                <ScheduleSelector
                    selection={schedule}
                    numDays={7}
                    minTime={6}
                    maxTime={24}
                    timeFormat={"hh A"}
                    dateFormat={"ddd"}
                    startDate={"11-21-21"}
                    onChange={handleChange}
                    unselectedColor='rgba(240,240,240,0.2)'
                    selectedColor='#223DFF'
                    id="filterTable"
                />
            </div>
            <LargeButton onClick={()=>submitTimetable()}>저장하기</LargeButton>
        </div>
    )
}

export default TimePopup