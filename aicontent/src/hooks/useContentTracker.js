import { useEffect } from 'react';
import { updateCharacters } from "../services/userService";

const useContentTracker = () => {
    useEffect(() => {
        console.log("heyeyy")
        const updateCharactersRef = async () => {
            await updateCharacters();
        };
        updateCharactersRef();
    }, []);
};

export default useContentTracker;
