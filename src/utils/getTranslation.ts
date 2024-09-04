// import pick from 'lodash/pick';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const defaultTranslation: (keyof IntlMessages)[] = [
    '',
    '-',
    'pages',
    'common',
    'entity',
    'fields',
    'state_info',
    'core',
    'navigation',
    'modals',
    'columns',
    'reminder',
    'app_version_alert'
];

async function getTranslation(locale?: string, additionalTranslation?: (keyof IntlMessages)[]) {
    // const messages = (await import(`../../public/locales/${locale}.json`)).default;
    // return pick(messages, [...defaultTranslation, ...(additionalTranslation || [])]);
    const result = await serverSideTranslations(locale ?? 'en', [
        ...defaultTranslation,
        ...(additionalTranslation || [])
    ]);
    return result;
}

export default getTranslation;
