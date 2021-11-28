import React,{useState} from 'react';
import '../../css/Pages/AccountPage/SignupPage.css';
import Back from '../../Components/common/Back';
import LargeButton from '../../Components/common/LargeButton';
import AddressSetting from '../../Components/common/AddressSetting';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignupPage = (props) => {
    const [name,setName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')

    const [randomNumber,setRandomNumber] = useState('')
    const [certification,setCertification] = useState()
    const [isCertify,setIsCertify] = useState(false)
    const [isCertMessage,setIsCertMessage] = useState('')

    const [openMap,setOpenMap] = useState(false)
    const [address,setAddress] = useState('');
    const [detailAddress,setDetailAddress] = useState('');

    const navigate = useNavigate();

    //지도 오픈
    const showMap = () => {
        setOpenMap(true)
    }

    //랜덤 인증번호 생성
    const createCertNum = () => {
        let randomNum = String(Math.floor(Math.random()*1000000)).padStart(6,"0")
        setRandomNumber(randomNum);
        console.log(randomNum);
    }

    const certify = (input,number) => {
        console.log(input,number)
        console.log(typeof(input),typeof(number))
        if(input === number){
            setIsCertify(true)
        }
    }

    //회원가입 폼 제출
    const submitSignup = () => {
        certify(certification,randomNumber)

        if (isCertify) {
            let signupInfo = {
                phonenum:phoneNumber,
                name:name,
                address:address
            }
            axios.post('http://localhost:8080/user/signup',signupInfo)
            .then(response => {
                if(response.data.message === 'SUCCESS'){
                    navigate('/login')
                }else{
                    console.log('request is success,but fail')
                }
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            setIsCertMessage('인증번호가 올바르지 않습니다.')
        }
    }


    return(
        <main className="SignupPage">
            <header>
                <Back link="/login"/>
                <h1>회원가입</h1>
            </header>
            <section className="signup-section">
                <h3>이름</h3>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="이름을 입력해주세요."
                />
            </section>
            <section className="signup-section">
                <h3>전화번호</h3>
                <input 
                    type="text" 
                    value={phoneNumber} 
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    placeholder="전화번호를 입력해주세요(형식:010-1234-5678)"
                />
                <button className={phoneNumber ? "cert-btn-active" : "cert-btn"} onClick={createCertNum}>인증하기</button>
            </section>
            <section className="signup-section">
                <h3>인증번호</h3>
                <input 
                    type="number" 
                    value={certification} 
                    onChange={(e)=>setCertification(e.target.value)}
                    placeholder="인증번호를 입력해주세요."
                />
                <p className="cert-message">{isCertMessage}</p>
            </section>
            <section className="signup-section">
                <h3>주소/상세주소</h3>
                <input 
                    type="text" 
                    value={address} 
                    onFocus={()=>showMap()}
                    onChange={(e)=>setAddress(e.target.value)}
                    placeholder="주소를 입력해주세요."
                />
                {openMap && <AddressSetting title="주소 설정" setOpenMap={setOpenMap} setAddress={setAddress}/>}
                <input 
                    type="text" 
                    value={detailAddress} 
                    onChange={(e)=>setDetailAddress(e.target.value)}
                    placeholder="상세 주소를 입력해주세요."
                />
            </section>
            <LargeButton onClick={()=>submitSignup()}>회원가입</LargeButton>
        </main>
    )
}

export default SignupPage