import {useEffect} from "react";

const useClosePopup = (func) => {
    useEffect(() => {
        document.addEventListener('mousedown', func);
        return () => {
            document.removeEventListener('mousedown', func);
        };
    }, []);
}

export default useClosePopup;