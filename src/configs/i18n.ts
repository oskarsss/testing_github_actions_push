// import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// i18n

//     // Enables the i18next backend
//     .use(Backend)

//     // Enable automatic language detection
//     .use(LanguageDetector)

//     // Enables the hook initialization module
//     .use(initReactI18next)
//     .init({
//         lng    : 'en',
//         backend: {
//             /* translation file path */
//             loadPath: '/locales/{{lng}}.json'
//         },
//         fallbackLng : 'en',
//         debug       : false,
//         keySeparator: false,
//         react       : {
//             useSuspense: false
//         },
//         interpolation: {
//             escapeValue    : false,
//             formatSeparator: ','
//         }
//     });

// export default i18n;

// import {notFound} from 'next/navigation';
// import {getRequestConfig} from 'next-intl/server';

// // Can be imported from a shared config
// const locales = ['en', 'ак'];

// export default getRequestConfig(async ({locale}) => {
//     // Validate that the incoming `locale` parameter is valid
//     if (!locales.includes(locale as any)) notFound();

//     return {
//         messages: (await import(`../../public/locales/${locale}.json`)).default
//     };
// });
