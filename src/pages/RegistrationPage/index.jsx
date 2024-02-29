import React, { useEffect, useState } from 'react';
import { IconButton, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionFullRegister } from '../../redux/actions/actionsAuth';
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import './style.css';

const RegistrationPage = ({ onRegister, myId, status }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [passAgain, setPassAgain] = useState('')
    const [valid, setValid] = useState(false)

    const navigate = useNavigate()
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    function regHandler() {
        if (login && password && passAgain) {
            if (password !== passAgain) {
                setError('Please, repeat the password correctly')
                setValid(false)
            } else {
                if (password.match(regex)) {
                    setError('')
                    setValid(true)
                    onRegister(login, password)
                } else {
                    setError('The password must contain at least 8 chars lower and uppercase and one number')
                    setValid(false)
                }
            }
        } else {
            setError('All the fields cannot be empty')
            setValid(false)
        }
    }

    useEffect(() => {
        if (valid && status === 'RESOLVED' && myId) {
            navigate('/profile/' + myId);
        }
    }, [status, myId])

    return (
        <div className='reg-cont'>
            <div className='reg-box'>
                <h3>Registration</h3>
                <TextField
                    variant="standard"
                    label="Username"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} />
                <TextField
                    variant="standard"
                    label="Password"
                    type={showPass ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)} />
                <TextField
                    variant="standard"
                    label="Password again"
                    type={showPass ? 'text' : 'password'}
                    onChange={(e) => setPassAgain(e.target.value)} />
                <IconButton
                    style={{ position: 'relative', marginLeft: 'auto', bottom: '35px' }}
                    aria-label="toggle password visibility"
                    onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <div>

                    <div style={{ marginTop: '15px' }}>
                        <p style={{ color: 'red', fontSize: '16px', position: 'relative', bottom: '30px' }}>{error}</p>
                        <button
                            onClick={() => regHandler()}
                            className={'primeBtn'}>
                            Create account
                        </button>
                        <p>Already have an account? <br />
                            <button
                                className='primeBtn'>
                                <Link to='/login'>Log in</Link>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};


export const CRegistrationPage = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    status: state?.promise?.login?.status
}),
    { onRegister: actionFullRegister }
)(RegistrationPage);