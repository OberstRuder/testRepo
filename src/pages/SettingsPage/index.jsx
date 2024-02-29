import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { actionFullChangeLogin } from "../../redux/actions/actionsMe";
import { useNavigate } from "react-router";
import { actionClearPromiseByName } from "../../redux/actions/actionPromise";
import { store } from '../../redux/store'
import { CDropzoneAvatar } from "../../components/Avatar/AvatarDrop";
import Avatar from "../../components/Avatar/Avatar";
import DefaultAvatar from "../../components/Avatar/DefaultAvatar";
import './style.css';


const Settings = ({ onChange, avatar, myId, clearPromise, myAvatar, login, setAvatar, changeLogin }) => {
    const navigate = useNavigate()
    const [newLogin, setNewLogin] = useState(login);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        store.dispatch(clearPromise('changeLogin'))
        store.dispatch(clearPromise('setAvatar'))
        if (setAvatar?.status === 'RESOLVED' || changeLogin?.status === 'RESOLVED') {
            navigate(`/profile/${myId}`);
        }
    }, [setAvatar?.status, changeLogin?.status]);

    function setOrShowAvatar() {
        if (isEditing) {
            return <CDropzoneAvatar />
        } else {
            if (myAvatar) {
                return <Avatar url={myAvatar} className='avatarPic' />
            } else {
                return <DefaultAvatar />
            }
        }
    }


    return (
        <>
            <div className='settings-cont'>
                <div>
                    <h3 className='post-text'>Change avatar</h3>
                    <div className='edit-box'>
                        {setOrShowAvatar()}
                        <button children={isEditing ? 'Cancel' : 'change photo'}
                            className='primeBtn'
                            onClick={() => setIsEditing(!isEditing)} />
                    </div>
                </div>
                <div >
                    <h3 className='post-text'>Change login</h3>
                    <div className='edit-box'>
                        <TextField
                            type="text"
                            placeholder="New Login"
                            value={newLogin}
                            onChange={(e) => setNewLogin(e.target.value)}
                        />
                        <button
                            className='primeBtn'
                            disabled={!newLogin || login === newLogin}
                            onClick={() => onChange(newLogin)}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const CSettings = connect(
    (state) => ({
        changeData: state?.promise?.changeLogin,
        me: state.promise?.me,
        myId: state?.auth?.payload?.sub?.id,
        myAvatar: state?.promise?.me?.payload?.avatar?.url,
        login: state?.promise?.me?.payload?.login,
        avatar: state?.promise?.me?.payload?.avatar?.url,
        changeLogin: state?.promise?.changeLogin,
        setAvatar: state?.promise?.setAvatar
    }),
    {
        onChange: actionFullChangeLogin,
        clearPromise: actionClearPromiseByName
    }
)(Settings);