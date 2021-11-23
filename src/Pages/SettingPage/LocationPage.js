/* global kakao */

import React,{useState,useRef,useEffect} from 'react';
import '../../css/Components/Common/AddressSetting.css';
import Back from '../../Components/common/Back';
import LargeButton from '../../Components/common/LargeButton';
import AddressSetting from '../../Components/common/AddressSetting';


const LocationPage = (props) => {
    const container = useRef(null)

    useEffect(()=>{
        
    },[]);

    const[close,setClose] = useState(false)
    const closePage = () => {
        setClose(true)
        props.setOpenMap(false)
        
    }
    return(
            <div className="setAddress">
                <header>
                    <Back link='/signup' onClick={()=>props.setOpenMap(false)}/>
                    <h2>{props.title}</h2>
                </header>

                <AddressSetting/>

                <section className="confirm-address">
                    <h3>이 주소가 맞나요?</h3>
                    <div></div>
                </section>
                <LargeButton>주소 설정</LargeButton>
            </div>
        
    )
}

export default LocationPage;