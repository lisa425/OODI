import React,{useState} from 'react';
import '../../css/Pages/AccountPage/SignupPage.css';
import Back from '../../Components/common/Back';
import LargeButton from '../../Components/common/LargeButton';
import AddressSetting from '../../Components/common/AddressSetting';

const SignupPage = () => {
    const [name,setName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState()
    const [certification,setCertification] = useState()
    const [openMap,setOpenMap] = useState(false)
    const [address,setAddress] = useState('');
    const [detailAddress,setDetailAddress] = useState('');

    const showMap = () => {
        setOpenMap(true)
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
                    type="number" 
                    value={phoneNumber} 
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    placeholder="전화번호를 입력해주세요."
                />
                <button className="cert-btn">인증하기</button>
            </section>
            <section className="signup-section">
                <h3>인증번호</h3>
                <input 
                    type="number" 
                    value={certification} 
                    onChange={(e)=>setCertification(e.target.value)}
                    placeholder="인증번호를 입력해주세요."
                />
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
            <LargeButton>회원가입</LargeButton>
        </main>
    )
}

export default SignupPage