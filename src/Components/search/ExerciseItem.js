import React,{useEffect,useState} from 'react';
import '../../css/Components/search/ExerciseItem.css'
import ball from '../../Assets/image/thumbnails/ball.jpg'
import yoga from '../../Assets/image/thumbnails/yoga.jpg'
import fight from '../../Assets/image/thumbnails/fight.jpeg'
import golf from '../../Assets/image/thumbnails/golf.jpg'
import health from '../../Assets/image/thumbnails/health.jpg'
import swim from '../../Assets/image/thumbnails/swim.jpg'

import {ReactComponent as Location} from '../../Assets/image/icons/location.svg'
// import axios from 'axios';

const ExerciseItem = (props) => {
    let randomNum = Math.floor(Math.random() * 9) + 1;
    const testImg = {
        ball:ball,
        yoga:yoga,
        fight:fight,
        golf:golf,
        health:health,
        swim:swim
    }
    // useEffect(() => {
    //     let randomNum = Math.floor(Math.random() * 8) + 1;
    //     console.log(randomNum)

    //     const token = window.localStorage.getItem('TOKEN_KEY')
    //     console.log(token)
    //     const config = {
    //         headers:{"Authorization": `Bearer ${token}`}
    //     };

    //     const data = {imageInfo:props.imageInfo}
    //     console.log("여기는 아이템 데이터:",data,typeof(data))

    //     axios.post(`http://localhost:8080/class/image`,data,config)
    //     .then(response => {
    //         if(response.status === 200){
    //             console.log("이미지 성공:",response.data)
    //         }else{
    //             console.log('request is success,but fail')
    //         }
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // }, [])

    return(
        <div className="exercise-item">
            <section className="thumbnail">
                <img className="thumbnail-img" src={testImg.fight} alt="thumbnail"/>
                <div className="location-info">
                    <Location style={{fill:'white'}}/>
                    <span>{props.address}&nbsp;{props.distance}m</span>
                </div>
            </section>
            <section className="keyword">
                <div>{props.subCategory}</div>
                <div>{props.type}</div>
            </section>
            <h4>{props.title}</h4>
            <p className="discount">{props.discountRate}%&nbsp;
                <span className="before-discount">{props.originPrice}원</span>
            </p>
            <p className="price">{props.price}원 <span>부터</span></p>
        </div>
    )
}

export default ExerciseItem