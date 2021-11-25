import React,{useState} from 'react';
import ScheduleSelector from 'react-schedule-selector'

const Timetable = (props) => {
    const [schedule,setSchedule] = useState([])

    const handleChange = (newSchedule) => {
        setSchedule(newSchedule)
        // console.log(schedule);
        //props.setSelectedTime(schedule)
    }
    
    return(
        <ScheduleSelector
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
    )
}

export default Timetable