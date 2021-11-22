import React from 'react';
import '../../css/Components/search/ExerciseItem.css'
import boxing from '../../Assets/image/boxing.jpeg'
import location from '../../Assets/image/location.svg'

const ExerciseItem = (props) => {
    /* props.id를 받아서 axios로 서버에서 데이터를 가져오고 컴포넌트를 리턴한다. 상위 컴포넌트에서 map으로 리스트를 출력 */
    return(
        <div className="exercise-item">
            <section className="thumbnail">
                <img className="thumbnail-img" src={boxing} alt="복싱"/>
                <div className="location-info">
                    <img className="location-icon" src={location} alt="복싱"/>
                    <span>상암동 500m</span>
                </div>
            </section>
            <section className="keyword">
                <div>복싱</div>
                <div>원데이클래스</div>
            </section>
            <h4>하루체험 태영복싱</h4>
            <p className="discount">50% <span className="before-discount">200,000원</span></p>
            <p className="price">100,000원 <span>부터</span></p>
        </div>
    )
}

export default ExerciseItem