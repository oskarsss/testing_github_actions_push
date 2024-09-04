import flags from 'react-phone-number-input/flags';
import { LANGUAGE_CODES } from '@/models/language/language';

type LanguageConfig = {
    code: LANGUAGE_CODES;
    name: string;
    secondary?: string;
    Flag: typeof flags.US;
};

const LANGUAGE_CONFIG: LanguageConfig[] = [
    {
        code: 'en',
        name: 'English',
        Flag: flags.US
    }

    // {
    //     code     : 'ua',
    //     name     : 'Ukrainian',
    //     secondary: 'Українська',
    //     Flag     : flags.UA
    // },
    // {
    //     code     : 'fr',
    //     name     : 'French',
    //     secondary: 'Français',
    //     Flag     : flags.FR
    // }
];

export default LANGUAGE_CONFIG;
