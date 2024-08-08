import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserStart,
    fetchUserSuccess,
    fetchUserFailure,
} from '../store/slices/userSlice'
import { fetchUser } from '../services/user';

const useFetchUser = () => {
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        const callFetchUser = async () => {
            dispatch(fetchUserStart());
            try {
                const response = await fetchUser();
                dispatch(fetchUserSuccess(response.data));
            } catch (error) { 
                dispatch(fetchUserFailure(error.message));
            }
        };
        callFetchUser();
    }, [dispatch])

    return { data, loading, error };
}

export default useFetchUser;