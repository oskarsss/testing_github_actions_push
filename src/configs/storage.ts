import { STORAGE_BUCKET_URL } from '@/configs/index';

export const getPublicURL = (url: string | null | undefined) =>
    !url ? '' : STORAGE_BUCKET_URL + url;
