import { IntlMessageKey } from '@/@types/next-intl';

export default function vehicle_type_options(t: (key: IntlMessageKey) => string) {
    return [
        {
            value: 'truck',
            label: t('entity:truck')
        },
        {
            value: 'trailer',
            label: t('entity:trailer')
        }
    ];
}
