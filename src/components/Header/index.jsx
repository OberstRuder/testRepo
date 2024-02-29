import React from 'react';
import logo from '../../materials/hipstagram.png'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionAuthLogout } from "../../redux/actions/actionsAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import './style.css';

const Header = ({ onLogout, id, login, isLogged }) => {

    return (
        <>
            {
                isLogged ?
                    (<div className='header'>
                        <div className='head-box'>
                            <div className='logo-box'>
                            <Link to={'/'}>
                                <img src={logo} alt='logo' />
                            </Link>
                            </div>
                            <div className='link-box'>
                                <Link to={`/profile/${id}`}>
                                    <AccountCircleIcon />
                                    Profile
                                </Link>
                                <Link to="/feed">
                                    <HomeIcon />
                                    Feed
                                </Link>
                                <Link to="/search">
                                    <SearchIcon />
                                    Search
                                </Link>
                                <Link to="/settings">
                                    <SettingsIcon />
                                    Settings
                                </Link>
                                <div onClick={() => onLogout()} style={{ justifySelf: '' }}>
                                    <Link to={'/login'}>
                                        <LogoutIcon />
                                        Log out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                    : (<div className='header'>
                        <div className='head-box'>
                            <Link to={'/'}>
                                <img src={logo} alt='logo' />
                            </Link>
                            <div className='link-box'>
                                <Link to={'/login'}>
                                    Log in
                                    <LoginIcon />
                                </Link>
                                <Link to={'/register'}>
                                    Register
                                    <CreateIcon />
                                </Link>
                            </div>
                        </div>
                    </div>)
            }
        </>
    );
};

export const CHeader = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    isLogged: state?.auth?.token,
    id: state.auth?.payload?.sub?.id,
    login: state?.promise?.me?.payload?.login,
}), {
    onLogout: actionAuthLogout
})(React.memo(Header));