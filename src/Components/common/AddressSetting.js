/* global kakao */

import React,{useState} from 'react';
import '../../css/Components/Common/AddressSetting.css';
import Back from './Back';
import LargeButton from './LargeButton';
import Map from './Map'
import {SearchOutlined} from '@ant-design/icons';

const AddressSetting = (props) => {
    //input state
    const [inputText,setInputText] = useState('') 
    //실제 map으로 보낼 keyword
    const [searchKeyword,setSearchKeyword] = useState('제주특별자치도 제주시 첨단로 242'); 
    
    //키워드를 지도에 반영한다.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchKeyword(inputText)
    }
   /* 주소 설정 팝업창을 끈다.(뒤로가기)*/ 
   const setOpenThisMap = () => {
       props.setOpenMap(false)
   }
   const setPropsAddress = () => {
       setOpenThisMap();
       props.setAddress(searchKeyword);
   }

    return(
        <div className="setAddress">
            <header>
                <h2>{props.title}</h2>
            </header>
            <section className="input-address">
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={(e)=>setInputText(e.target.value)} 
                    className="search-keyword"
                />
                <button className="submit-keyword" onClick={handleSubmit}>
                    <SearchOutlined style={{fontSize:'20px'}} />
                </button>
            </section>
            <Map searchKeyword={searchKeyword}/>

            <section className="confirm-address">
                <h3>이 주소가 맞나요?</h3>
                <div>{searchKeyword}</div>
            </section>
            <LargeButton onClick={()=>setPropsAddress()}>주소 설정</LargeButton>
        </div>
    )
}

export default AddressSetting;