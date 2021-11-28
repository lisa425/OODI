import React,{useState,useEffect,useHistory} from 'react';
import logo from '../../Assets/image/logo/logo_blue.png'
import '../../css/Pages/AccountPage/LoginPage.css';
import LargeButton from '../../Components/common/LargeButton';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios'

const LoginPage = (props) => {
    const [phoneNumber,setPhoneNumber] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate();

    // useEffect(()=>{
    //     axios.get('http://localhost:8080/test')
    //     .then(response => {
    //         console.log(response.data.message);
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // },[])

    const submitLogin = () => {
        axios.post('http://localhost:8080/user/login',{phonenum:phoneNumber})
        .then(response => {
            console.log(response)
            if(response.data.message === 'SUCCESS'){
                window.localStorage.clear();
                window.localStorage.setItem('TOKEN_KEY',response.data.token);
                navigate('/home')
            }else if(response.data.message === "회원가입 대상자입니다."){
                setMessage('회원가입 대상자 입니다.')
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    const handleChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    return(
        <main className="LoginPage">
            <img src={logo} alt="logo" className="logo"/>
            <input 
                type="text" 
                value={phoneNumber} 
                onChange={handleChange}
                placeholder="전화번호를 입력해주세요.(형식:010-0000-0000)"
            />
            <p style={{color:'red',marginTop:'5px'}}>{message}</p>
            <LargeButton onClick={()=>submitLogin()}>로그인</LargeButton>
            <p>아직 회원이 아니신가요?</p>
            <Link to='/signup' className='to-signup'><p>회원가입하기</p></Link>
        </main>
    )
}

export default LoginPage