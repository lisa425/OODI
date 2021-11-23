import React,{useState} from 'react';
import logo from '../../Assets/image/logo/logo_blue.png'
import '../../css/Pages/AccountPage/LoginPage.css';
import LargeButton from '../../Components/common/LargeButton';
import {Link} from 'react-router-dom';

const LoginPage = () => {
    const [phoneNumber,setPhoneNumber] = useState()
    
    return(
        <main className="LoginPage">
            <img src={logo} alt="logo" className="logo"/>
            <input 
                type="number" 
                value={phoneNumber} 
                onChange={(e)=>setPhoneNumber(e.target.value)}
                placeholder="전화번호를 입력해주세요"
            />
            <LargeButton>로그인</LargeButton>
            <p>아직 회원이 아니신가요?</p>
            <Link to='/signup' className='to-signup'><p>회원가입하기</p></Link>
        </main>
    )
}

export default LoginPage