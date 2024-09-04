import { LANGUAGE_CODES, MOMENT_LOCALES, MUI_LOCALES } from '@/models/language/language';

export const LANGUAGE_LOCAL_TO_MOMENT: Record<LANGUAGE_CODES, keyof typeof MOMENT_LOCALES> = {
    en: 'en',
    ua: 'uk',
    fr: 'fr'
};

export const LANGUAGE_LOCAL_TO_MUI: Record<LANGUAGE_CODES, keyof typeof MUI_LOCALES> = {
    en: 'enUS',
    ua: 'ukUA',
    fr: 'frFR'
};
