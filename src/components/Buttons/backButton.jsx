import React from 'react';
import {useNavigate} from "react-router";

const BackButton = () => {
   const navigate = useNavigate();

    return (
        <>
            <button
                className='ordinaryBtn'
                onClick={() => navigate(-1)}>
                go back</button>
        </>
    );
};

export default BackButton;