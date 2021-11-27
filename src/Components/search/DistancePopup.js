import React,{useState} from 'react';
import LargeButton from '../common/LargeButton'
import {CloseOutlined} from '@ant-design/icons';

const DistancePopup = (props) => {
    const [distance,setDistance] = useState(0)

    const submitDistance = () => {
        props.setNewDistance(distance);
    }
    return(
        <div className="popup">
            <header className="popup-title">
                <h3>거리</h3>
                <CloseOutlined className="close" onClick={()=>props.setIsDistance(false)}/>
            </header>
            <input type="range" min={100} max={5000} step={100} value={distance} onChange={(e)=>setDistance(e.target.value)}/>
            <div>반경 {distance}m 이내</div>
            <LargeButton onClick={submitDistance}>설정하기</LargeButton>
        </div>
    )
}

export default DistancePopup