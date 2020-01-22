import { useCallback } from 'react';

export const useValidationMessages = () => {
    return useCallback( message => {
        if (window.M && message) {
            window.M.toast({ html: message });
        }
    }, [])
}