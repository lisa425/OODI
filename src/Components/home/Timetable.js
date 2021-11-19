import React from 'react';
import styled from 'styled-components'
import SmallSetting from './SmallSetting'

const Timetable = (props) => {
    const TimetableBox = styled.div`
        border-radius:5px;
        width:90%;
        height:267px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        margin:0;
        padding:0 5%;
        color:black;
        font-size:24px;
        border:1px solid #cacaca
    `
    return(
        <TimetableBox>
            <div>
                <p>채원님,</p>
                <p><b>128시간</b>중에</p>
                <p><span style={{color:'#223DFF',fontWeight:'bold'}}>7시간</span>을 활용할 수 있어요!</p>
            </div>
            <SmallSetting position>시간설정</SmallSetting>
        </TimetableBox>
    )
}

export default Timetable