import React,{useEffect,useState} from 'react';
import '../../css/Components/search/ExerciseItem.css'
import test1 from '../../Assets/image/thumbnails/test1.jpg'
import test2 from '../../Assets/image/thumbnails/test2.jpg'
import test3 from '../../Assets/image/thumbnails/test3.jpg'
import test4 from '../../Assets/image/thumbnails/test4.jpg'
import test5 from '../../Assets/image/thumbnails/test5.jpg'
import test6 from '../../Assets/image/thumbnails/test6.jpg'
import test7 from '../../Assets/image/thumbnails/test7.jpg'
import test8 from '../../Assets/image/thumbnails/test8.jpg'
import test9 from '../../Assets/image/thumbnails/test9.jpeg'
import test10 from '../../Assets/image/thumbnails/test10.jpg'

import {ReactComponent as Location} from '../../Assets/image/icons/location.svg'
import axios from 'axios';

const ExerciseItem = (props) => {
    let randomNum = Math.floor(Math.random() * 9) + 1;
    const testImg = [test1,test2,test3,test4,test5,test6,test7,test8,test9,test10]
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
                <img className="thumbnail-img" src={testImg[randomNum]} alt="thumbnail"/>
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