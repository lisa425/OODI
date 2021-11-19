import React from 'react';
import styled from 'styled-components'

const PopExercise = (props) => {
    const PopExerciseBox = styled.div`
        width:calc(100%/3.1);
        height:149px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content: center;
        border-radius:5px;
        border:1px solid #cacaca;
        margin:1%;
        
    `
    return(
        <PopExerciseBox>
            <img src="" alt={props.name}/>
            <p>{props.name}</p>
        </PopExerciseBox>
    )
}

export default PopExercise