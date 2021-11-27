import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Map from '../../Components/common/Map'
import Back from '../../Components/common/Back'
import LargeButton from '../../Components/common/LargeButton'
import '../../css/Components/Common/AddressSetting.css';
import {SearchOutlined} from '@ant-design/icons';

const LocationSettingPage = (props) => {
    //input state
    const [inputText,setInputText] = useState('') 
    //실제 map으로 보낼 keyword
    const [searchKeyword,setSearchKeyword] = useState(''); 
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchKeyword(inputText)
    }

    useEffect(()=>{
        const token = window.localStorage.getItem('TOKEN_KEY')
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        //get user name
        axios.get('http://localhost:8080/user',config)
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                setInputText(response.data.address)
                setSearchKeyword(response.data.address)
            }
        }).catch((error)=>{
            console.log('error:',error)
        })
    },[])

    return(
        <div className="setAddress">
            <header>
                <Back link='/home'/>
                <h2>위치 설정</h2>
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
            <LargeButton>주소 설정</LargeButton>
        </div>
    )
}

export default LocationSettingPage;