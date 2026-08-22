import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useEffect, useState } from 'react';

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        // if there are any errors, set the auth to false
        auth().catch(() => setIsAuthorized(false));
    }, []);

    // if access token expires, we call this function
    const refreshToken = async () => {
        // get the refresh token from the local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            // get the access token from the backend using the refresh token
            const res = await api.post("api/api/token/refresh/", {
                refresh: refreshToken
            })

            // send the new acccess token to the backend
            if(res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            }
            else {
                setIsAuthorized(false);
            }
        }
        catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        // get the access token from local storage
        const token = localStorage.getItem(ACCESS_TOKEN);

        // if there is no access token, we set to unauthorized
        if(!token) {
            setIsAuthorized(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        const tokenExpiration = decodedToken.exp;
        const now = Date.now() / 1000;

        // if there is a token, and it expires, we refresh it by calling the helper function refreshToken
        if(tokenExpiration < now) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true); // if the access token is not expired yet
        }
    }

    // if inital state, show loading
    if(isAuthorized === null) {
        return (
            <div>Loading...</div>
        )
    }

    // if authorized, give access to children component, else, redirect to login
    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute;