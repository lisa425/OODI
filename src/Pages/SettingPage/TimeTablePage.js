import React,{useState} from 'react';
import Timetable from '../../Components/home/Timetable'
import LargeButton from '../../Components/common/LargeButton'
import Back from '../../Components/common/Back'
import {Link} from 'react-router-dom';
import '../../css/Pages/SettingPage/TimeTablePage.css'

const TimeTablePage = (props) => {
    const [selectedTime,setSelectedTime] = useState([]);
    
    const [resultTime,setResultTime] = useState([]);

    const [monTimeList,setMonTimeList] = useState([])
    const [tueTimeList,setTueTimeList] = useState([])
    const [wedTimeList,setWedTimeList] = useState([])
    const [thuTimeList,setThuTimeList] = useState([])
    const [friTimeList,setFriTimeList] = useState([])
    const [satTimeList,setSatTimeList] = useState([])
    const [sunTimeList,setSunTimeList] = useState([])
    
    // let mon_time_list = [];
    // let tue_time_list = [];
    // let wed_time_list = [];
    // let thu_time_list = [];
    // let fri_time_list = [];
    // let sat_time_list = [];
    // let sun_time_list = [];

    
    // [
    //     {day:'Mon', timeList: [1000, 1100, 1200, 1700]},
    //     {day:'Tue', timeList: [1300, 1400, 1800, 1900]}
    // ]


    let day,time;
    if(selectedTime.length > 0){
        console.log(selectedTime)
        for(let i=0;i<selectedTime.length;i++){
            day = selectedTime[i].toString().substr(0,3);
            time = String(selectedTime[i]).substr(16,5).replace(':','')

            console.log(day,time)

            switch(day){
                case 'Mon':
                    console.log('hi mon')
                    //mon_time_list.push(time);
                    setMonTimeList(prevList => [...prevList,time])
                    break;
                case 'Tue':
                    //tue_time_list.push(time);
                    setTueTimeList(prevList => [...prevList,time])
                    break;
                case 'Wed':
                    // wed_time_list.push(time);
                    setWedTimeList(prevList => [...prevList,time])
                    break;
                case 'Thu':
                    setThuTimeList(prevList => [...prevList,time])
                    // thu_time_list.push(time);
                    break;
                case 'Fri':
                    // fri_time_list.push(time);
                    setFriTimeList(prevList => [...prevList,time])
                    break;
                case 'Sat':
                    // sat_time_list.push(time);
                    setSatTimeList(prevList => [...prevList,time])
                    break;
                case 'Sun':
                    // sun_time_list.push(time);
                    setSunTimeList(prevList => [...prevList,time])
                    break;
                default:
                    console.log('Its not date');
                    break;
            }
        }  
    }  

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

        console.log('selected:',selectedTime.length)

    const submitTime = () => {

    }
    return(
        <div className='timetablepage'>
            <div className='page-title'>
                <Back link='/home'/>
                <div className='page-title-text'>
                    <h1>공강 시간 입력</h1>
                    <p className='useable-time'>128시간 중에 
                    <span style={{color:'#223DFF',fontWeight:'bold'}}>7시간</span>
                을 활용할 수 있어요!</p>
                </div>
            </div>
            <Timetable className='time-table' setSelectedTime={setSelectedTime}/>
            <LargeButton onClick={()=>submitTime()}>저장하기</LargeButton>
        </div>
    )
}

export default TimeTablePage