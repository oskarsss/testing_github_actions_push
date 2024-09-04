import { toast } from 'react-hot-toast';
import type { TFunction } from '@/@types/next-intl';

export const showError = (errorList?: string, t?: TFunction) => {
    const baseText =
        t?.('new_loads:errors.something_went_wrong') ||
        'Oops! Something went wrong with your submission!';
    const msg = errorList ? `${baseText} \n\n  ${errorList}` : baseText;
    return toast.error(msg, {
        style: {
            minWidth: '480px'
        }
    });
};

export const deepEqualObjects = (obj1: unknown, obj2: unknown) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);
