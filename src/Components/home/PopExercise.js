import React from 'react';
import styled from 'styled-components'
import ball from '../../Assets/image/pictogram/ball.png';
import golf from '../../Assets/image/pictogram/golf.png';
import swim from '../../Assets/image/pictogram/swim.png';
const PopExercise = (props) => {
    const PopExerciseBox = styled.div`
        width:calc(100%/3.1);
        height:149px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content: center;
        border-radius:5px;
        margin:1%;
        box-shadow: 0px 0px 15px 0px rgba(196, 196, 196, 0.2);
        background-color:white;
    `

    const exercise = {
        'ball':{
            'img':ball,
            'name':'구기종목'
        },
        'swim':{
            'img':swim,
            'name':'수영'
        },
        'golf':{
            'img':golf,
            'name':'골프'
        },
    }

    return(
        <PopExerciseBox>
            <img src={exercise[props.name]['img']} alt={exercise[props.name]['name']} style={{width:'44px',height:'44px',marginBottom:'17px'}}/>
            <p>{exercise[props.name]['name']}</p>
        </PopExerciseBox>
    )
}

export default PopExercise