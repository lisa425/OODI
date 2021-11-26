import React from 'react';
import '../../css/Components/search/ExerciseItem.css'
import boxing from '../../Assets/image/boxing.jpeg'
import {ReactComponent as Location} from '../../Assets/image/icons/location.svg'

const ExerciseItem = (props) => {
    
    return(
        <div className="exercise-item">
            <section className="thumbnail">
                <img className="thumbnail-img" src={boxing} alt="복싱"/>
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