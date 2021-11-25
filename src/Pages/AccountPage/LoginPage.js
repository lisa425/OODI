import React,{useState,useEffect} from 'react';
import logo from '../../Assets/image/logo/logo_blue.png'
import '../../css/Pages/AccountPage/LoginPage.css';
import LargeButton from '../../Components/common/LargeButton';
import {Link} from 'react-router-dom';
import axios from 'axios'

const LoginPage = ({history}) => {
    const [phoneNumber,setPhoneNumber] = useState('')
    const [message,setMessage] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:8080/test')
        .then(response => {
            console.log(response.data.message);
        }).catch((error) => {
            console.log(error)
        })
    },[])

    const submitLogin = () => {
        // https://stackoverflow.com/questions/45980173/react-axios-network-error
        // https://stackoverflow.com/questions/68069883/not-able-to-send-an-axios-post-to-a-node-js-server-neterr-connection-refused
        console.log(phoneNumber)
        axios.post('http://localhost:8080/user/login',{phonenum:phoneNumber})
        .then(response => {
            console.log(response)
            if(response.data.message === 'SUCCESS'){
                localStorage.setItem('TOKEN_KEY',response.data.token);
                history.pushState('/');
            }else if(response.data.message === "회원가입 대상자입니다."){
                setMessage('회원가입 대상자 입니다.')
            }
        }).catch((error)=>{
            console.log(error);
        })
        console.log('out of axios')
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
                placeholder="전화번호를 입력해주세요.(형식:010-****-****)"
            />
            <p>{message}</p>
            <LargeButton onClick={()=>submitLogin()}>로그인</LargeButton>
            <p>아직 회원이 아니신가요?</p>
            <Link to='/signup' className='to-signup'><p>회원가입하기</p></Link>
        </main>
    )
}

export default LoginPage