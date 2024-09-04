import toast from 'react-hot-toast';
import Router from 'next/router';
import i18next from 'i18next';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useCallback } from 'react';

const useCopyToClipboard = () => {
    const { t } = useAppTranslation();

    return useCallback(
        async (data: string | number, textInfo?: string, additional?: string) => {
            try {
                const translations = t('common:copy.copied');
                const translatedTextInfo =
                    (textInfo || translations || 'Copied') + (additional ? ` ${additional}` : '');

                await navigator.clipboard.writeText(data.toString());
                toast.success(translatedTextInfo);
            } catch (e) {
                console.error(e);
            }
        },
        [t]
    );
};

export default useCopyToClipboard;
