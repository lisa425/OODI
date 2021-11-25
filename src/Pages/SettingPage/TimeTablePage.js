import React,{useState} from 'react';
import LargeButton from '../../Components/common/LargeButton'
import Back from '../../Components/common/Back'
import '../../css/Pages/SettingPage/TimeTablePage.css'
import ScheduleSelector from 'react-schedule-selector'
import axios from 'axios'

const TimeTablePage = (props) => {
    //타임테이블 객체 handling
    const [schedule,setSchedule] = useState([])
    const handleChange = (newSchedule) => {
        setSchedule(newSchedule)
    }

    //요일별 가능 시간을 담는 배열
    const [monTimeList,setMonTimeList] = useState([])
    const [tueTimeList,setTueTimeList] = useState([])
    const [wedTimeList,setWedTimeList] = useState([])
    const [thuTimeList,setThuTimeList] = useState([])
    const [friTimeList,setFriTimeList] = useState([])
    const [satTimeList,setSatTimeList] = useState([])
    const [sunTimeList,setSunTimeList] = useState([])


    let day,time;
    const devideDayTimeList = () => {
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
        const token = window.localStorage.getItem('TOKEN_KEY')
        const ableTimeList = setAbleTimeList();

        console.log(ableTimeList)

        axios.post('http://localhost:8080/timetable/setTable',{time:ableTimeList},{headers:{"Authorization": `Bearer ${token}`}})
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                alert('success timetable')
            }else{
                console.log('request is success,but fail')
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className='timetablepage'>
            <div className='page-title'>
                <Back link='/home'/>
                <div className='page-title-text'>
                    <h1>공강 시간 입력</h1>
                    <p className='useable-time'>128시간 중에 
                    <span style={{color:'#223DFF',fontWeight:'bold'}}> {schedule.length}시간</span>
                을 활용할 수 있어요!</p>
                </div>
            </div>
            <ScheduleSelector
                className="time-table"
                selection={schedule}
                numDays={7}
                minTime={6}
                maxTime={24}
                timeFormat={"hh A"}
                dateFormat={"ddd"}
                startDate={"11-21-21"}
                onChange={handleChange}
                unselectedColor='#e4e4e4'
                selectedColor='#223DFF'
            />
            <LargeButton onClick={()=>submitTimetable()}>저장하기</LargeButton>
        </div>
    )
}

export default TimeTablePage