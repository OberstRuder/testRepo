import React from 'react';
import error404 from '../../materials/404.png'
import './style.css';

export const NotFound = () => {

    return (
        <div className='error-cont'>
            <h1>Ooops!</h1>
            <h3>Page not found :(</h3>
            <br/>
            <img className='error-img' src={error404} alt='img'/>
        </div>
    )
}