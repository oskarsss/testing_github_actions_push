import { BrokersIcon, CustomersIcon } from '@/@core/icons/custom-nav-icons/icons';
import { CommonRadioConfigType } from '@/@core/ui-kits/basic/common-radio-groups/CommonRadioGroups';

export type LoadClientRadioGroupValueType = 'broker_id' | 'customer_id';

export const LOAD_CLIENT_RADIO_GROUP_CONFIG: CommonRadioConfigType<'customer_id' | 'broker_id'> = [
    {
        Icon : BrokersIcon,
        label: 'entity:broker',
        value: 'broker_id'
    },
    {
        Icon : CustomersIcon,
        label: 'entity:customer',
        value: 'customer_id'
    }
];
