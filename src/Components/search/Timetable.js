import React,{useState,useEffect} from 'react';
import ScheduleSelector from 'react-schedule-selector'
import axios from 'axios';

const Timetable = (props) => {
    //날짜 개체를 만드는 함수
    const makeDateList = (day,time) => {
        let date;
        switch(day){
            case "Mon":
                date = 22
                break;
            case "Tue":
                date = 23
                break;
            case "Wed":
                date = 24
                break;
            case "Thu":
                date = 25
                break;
            case "Fri":
                date = 26
                break;
            case "Sat":
                date = 27
                break;
            case "Sun":
                date = 21
                break;
        }
        if(time<1000){
            time = "0"+time.toString()
        }else{
            time = time.toString()
        }
        let timeString = time.substr(0,2) + ':00:00'
        
        let DateString = `${day} Nov ${date} 2021 ${timeString} GMT+0900 (한국 표준시)`
        // console.log(DateString)
        return DateString;
    }
    //유저의 타임테이블을 가져온다.
    const [userTimeList,setUserTimeList] = useState([])
    useEffect(() => {
        const token = window.localStorage.getItem('TOKEN_KEY')
        console.log(token)

        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        let date_array = []
        axios.get('http://localhost:8080/timetable/getTable',config)
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                console.log('success')
                console.log(response.data.timetable)
                response.data.timetable.map((item,index)=>{
                    for(let i=0;i<item.timeList.length;i++){
                        let userDate = makeDateList(item.day,item.timeList[i])
                        date_array = date_array.concat(userDate)
                    }            
                })
                setSchedule(date_array)
                console.log('userTimeList:',schedule)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const [schedule,setSchedule] = useState([])

    // const handleChange = (newSchedule) => {
    //     console.log(newSchedule)
    //     setSchedule(newSchedule)
    // }

    //onChange={handleChange}

    

    return(
        <ScheduleSelector
            selection={schedule}
            numDays={7}
            minTime={6}
            maxTime={24}
            timeFormat={"hh A"}
            dateFormat={"ddd"}
            startDate={"11-21-21"}
            unselectedColor='#efefef'
            selectedColor='rgba(206,212,255,0.9)'
        />
    )
}

export default Timetable