import { fetchAuthUserGoogle, fetchAuthUser } from '../services/userService';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGoogleAuth = (dispatch) => {
    const history = useNavigate();

    useEffect(() => {
        const log = async () => {
            await fetchAuthUserGoogle(dispatch);
            await fetchAuthUser(dispatch);
            history('/dashboard'); // or any other route you want to navigate to
        };
        log();
    }, [dispatch, history]);
};
