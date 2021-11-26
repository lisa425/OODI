import React,{useState} from 'react';
import LargeButton from '../common/LargeButton'

const DistancePopup = (props) => {
    const [distance,setDistance] = useState(0)
    const submitDistance = () => {
        props.distance(distance);
    }
    return(
        <div className="popup">
            <header className="popup-title">
                <h3>거리</h3>
                <CloseOutlined className="close" onClick={()=>props.setIsDistance(false)}/>
            </header>
            <div>반경 {distance}km 이내</div>
            <LargeButton onClick={submitDistance}>설정하기</LargeButton>
        </div>
    )
}

export default DistancePopup