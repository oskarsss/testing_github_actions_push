import type { IntlMessageKey } from '@/@types/next-intl';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import { formatPhoneNumber } from '@/utils/formatting';

export type InfoConfigItem = {
    key: string;
    label: IntlMessageKey;
    value: string;
};

const getContactInfo = (
    serviceProvider: ServiceProviderModel_ServiceProvider | null
): InfoConfigItem[] => [
    {
        key  : '1',
        label: 'fields:name.label',
        value: serviceProvider?.name || '-'
    },
    {
        key  : '2',
        label: 'fields:contact_name.label',
        value: serviceProvider?.contactName || '-'
    },
    {
        key  : '3',
        label: 'fields:phone_number.label',
        value: serviceProvider?.phone ? formatPhoneNumber(serviceProvider.phone) : '-'
    },
    {
        key  : '4',
        label: 'fields:email.label',
        value: serviceProvider?.email || '-'
    },
    {
        key  : '5',
        label: 'fields:fax.label',
        value: serviceProvider?.fax ? formatPhoneNumber(serviceProvider.fax) : '-'
    }
];

const getAddressInfo = (
    serviceProvider: ServiceProviderModel_ServiceProvider | null
): InfoConfigItem[] => [
    {
        key  : '1',
        label: 'fields:address_line_1.label',
        value: serviceProvider?.addressLine1 || '-'
    },
    {
        key  : '2',
        label: 'fields:address_line_2.label',
        value: serviceProvider?.addressLine2 || '-'
    },
    {
        key  : '3',
        label: 'fields:city.label',
        value: serviceProvider?.addressCity || '-'
    },
    {
        key  : '4',
        label: 'fields:state.label',
        value: serviceProvider?.addressState || '-'
    },
    {
        key  : '5',
        label: 'fields:postal_code.zip_label',
        value: serviceProvider?.addressPostalCode || '-'
    }
];

const infoSectionsConfig = {
    getContactInfo,
    getAddressInfo
};

export default infoSectionsConfig;
