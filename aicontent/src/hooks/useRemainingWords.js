import { useState, useEffect } from 'react';

export const useRemainingWords = (state) => {
    const [remainingWords, setRemainingWords] = useState(state.user ? state.user.user.characters : 0);

    useEffect(() => {
        setRemainingWords(state.user ? state.user.user.characters : 0);
    }, [state.user]);

    return { remainingWords, setRemainingWords };
};
