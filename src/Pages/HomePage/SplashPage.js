import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
const SplashPage = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(window.localStorage.getItem('TOKEN_KEY') === null){
            navigate('/login')
        }else{
            navigate('/home')
        }
    },[])
    return(
        <div>oodi!</div>
    )
}

export default SplashPage