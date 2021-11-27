import React,{useState} from 'react';
import LargeButton from '../common/LargeButton'
import {CloseOutlined} from '@ant-design/icons';
import "../../css/Components/search/DistancePopup.css";
const DistancePopup = (props) => {
    const [distance,setDistance] = useState(0)

    const submitDistance = () => {
        console.log(distance)
        props.setNewDistance(distance);
    }

    const closeDistance = () => {
        props.setIsDistance(false)
    }
    return(
        <div className="popup distance-popup">
            <header className="popup-title">
                <h3>거리</h3>
                <CloseOutlined 
                    className="close" 
                    onClick={()=>closeDistance()}/>
            </header>
            <section className="range">
                <input 
                    id="dstRange" 
                    type="range" 
                    min={100} 
                    max={3000} 
                    step={100} 
                    value={distance} 
                    onChange={(e)=>setDistance(e.target.value)}
                />
                <div className="unit">
                    <span>100m</span>
                    <span>1.5km</span>
                    <span>3km</span>
                </div>
            </section>
            <div className="distance-range">반경 {distance}m 이내</div>
            <LargeButton onClick={submitDistance}>설정하기</LargeButton>
        </div>
    )
}

export default DistancePopup