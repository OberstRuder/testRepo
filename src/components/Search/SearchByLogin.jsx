import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { OneUserInList } from "../Like/OneUserInList";
import { TextField } from "@mui/material";
import { queryUserByLogin } from "../../gql/userGql";

const useDebounce = (cb, depArray, delay) => {
    let timeoutRef = useRef()

    useEffect(() => {
        clearInterval(timeoutRef.current)
        timeoutRef.current === undefined ? timeoutRef.current = -1 : timeoutRef.current = setTimeout(cb, delay)
    }, depArray)
};

const SearchByLogin = ({ user, onGetUser, foundUsers }) => {
    const [login, setLogin] = useState('')

    useDebounce(() => onGetUser(login), [login], 2000);

    return (
        <form>
            <h3>Enter login to search users</h3>
            <div className='search-box'>
                <TextField
                    style={{ width: '300px', marginBottom: '25px' }}
                    placeholder="search user by login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>

            {foundUsers ?
                foundUsers.map((user) => {
                    return <OneUserInList key={user._id} user={user} />
                })
                : null
            }
        </form>
    );
};

export const CSearchByLogin = connect(
    (state) => ({
        foundUsers: state?.promise?.foundUsers?.payload,
    }),
    {
        onGetUser: queryUserByLogin,
    }
)(SearchByLogin);