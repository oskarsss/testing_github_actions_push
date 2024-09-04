import { IntlMessageKey } from '@/@types/next-intl';

type SubmitButtonType = 'create' | 'update';

const defineButtonText = (
    text: IntlMessageKey | string,
    type?: SubmitButtonType
): IntlMessageKey | string => {
    switch (type) {
    case 'create':
        return 'common:button.create';
    case 'update':
        return 'common:button.update';
    default:
        return text;
    }
};

export default defineButtonText;
