import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const hasFocus = () => typeof document !== 'undefined' && document.hasFocus();

export default function useWindowFocus(path: string) {
    const [focused, setFocused] = useState(hasFocus); // Focus for first render
    const router = useRouter();

    useEffect(() => {
        setFocused(hasFocus()); // Focus for additional renders

        const onFocus = () => setFocused(true);
        const onBlur = () => setFocused(false);

        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, []);

    return focused && router.asPath === path && false; // TODO Stop polling for now
}
