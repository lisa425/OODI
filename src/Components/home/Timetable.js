import React,{useState} from 'react';
import SmallSetting from './SmallSetting'
import ScheduleSelector from 'react-schedule-selector'

/*  색상변경 옵션:
    unselectedColor='#dadada'
    selectedColor='#22fdea'
 */
const Timetable = (props) => {
    const [schedule,setSchedule] = useState([])

    const handleChange = (newSchedule) => {
        setSchedule(newSchedule)
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
            margin={1}
            onChange={handleChange}
            unselectedColor='#e4e4e4'
            selectedColor='#223DFF'
        />
    )
}

export default Timetable