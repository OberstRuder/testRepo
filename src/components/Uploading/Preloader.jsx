import { connect } from 'react-redux';
import loading from '../../materials/loading.gif'
import React from "react";
import dino from '../../materials/dino.gif'

const Preloaded = ({ promiseName, promiseState, children }) => (
    <>
        {promiseState[promiseName]?.status === 'RESOLVED' ? (
            children
        ) : promiseState[promiseName]?.status === 'REJECTED' ? (
            <div>
                <h1 style={{color: 'red'}}>Error loading :(</h1>
                <h4>Please, check your internet connection</h4>
                <img src={dino} alt='error-gif'/>
            </div>
        ) : (
            <img style={{display: 'block', margin: '0 auto', marginBottom: '200px', padding: '10px', width: '500px', height: '350px'}}
                 src={loading} width="400px" height="auto" alt='loading-gif'/>
        )}
    </>
);

export const CPreloaded = connect((state) => ({
        promiseState: state.promise
}
))(Preloaded);