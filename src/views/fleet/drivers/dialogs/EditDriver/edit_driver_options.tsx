/* eslint-disable import/no-anonymous-default-export */
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { styled } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PolicyIcon from '@mui/icons-material/Policy';
import CancelIcon from '@mui/icons-material/Cancel';
import { DriverStatus } from '@/models/fleet/drivers/driver-status';
import React from 'react';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import { DriverModel_PayoutReceiver } from '@proto/models/model_driver';
import type { TFunction } from '@/@types/next-intl';

export type StatusChipSelectOption<StatusType extends string> = (t: TFunction) => {
    status: StatusType;
    view: React.ReactNode;
}[];

export const Item = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'center',
    svg       : {
        width      : '20px',
        height     : '20px',
        marginRight: '6px'
    },
    span: {
        lineHeight: 'normal'
    }
}));

const type_options = (t: TFunction) => [
    {
        value: 'owner_operator',
        name : (
            <Item>
                {DRIVER_TYPE_ICONS[DriverTypeModel_Icon.OWNER_OPERATOR]}
                {t('state_info:drivers.type.owner_operator')}
            </Item>
        )
    },
    {
        value: 'lease',
        name : (
            <Item>
                {DRIVER_TYPE_ICONS[DriverTypeModel_Icon.LEASE]}
                {t('state_info:drivers.type.lease')}
            </Item>
        )
    },
    {
        value: 'lease_to_own',
        name : (
            <Item>
                {DRIVER_TYPE_ICONS[DriverTypeModel_Icon.LEASE_TO_OWN]}
                {t('state_info:drivers.type.lease_to_own')}
            </Item>
        )
    },
    {
        value: 'company',
        name : (
            <Item>
                {DRIVER_TYPE_ICONS[DriverTypeModel_Icon.COMPANY]}
                {t('state_info:drivers.type.company')}
            </Item>
        )
    }
];

const status_options: StatusChipSelectOption<DriverStatus> = (t: TFunction) => [
    {
        status: 'onboarding',
        view  : (
            <Item>
                <PendingActionsIcon
                    style={{ color: '#d48b00' }}
                    fontSize="small"
                />
                {t('state_info:drivers.full_status.onboarding')}
            </Item>
        )
    },
    {
        status: 'compliance_review',
        view  : (
            <Item>
                <PolicyIcon
                    style={{ color: '#e89800' }}
                    fontSize="small"
                />
                {t('state_info:drivers.full_status.compliance_review')}
            </Item>
        )
    },
    {
        status: 'active',
        view  : (
            <Item>
                <VerifiedUserIcon
                    style={{ color: '#46a544' }}
                    fontSize="small"
                />
                {t('state_info:drivers.full_status.active')}
            </Item>
        )
    },
    {
        status: 'pending_termination',
        view  : (
            <Item>
                <CancelIcon
                    style={{ color: '#c70000' }}
                    fontSize="small"
                />
                {t('state_info:drivers.full_status.pending_termination')}
            </Item>
        )
    },
    {
        status: 'terminated',
        view  : (
            <Item>
                <CancelIcon
                    style={{ color: '#c70000' }}
                    fontSize="small"
                />
                {t('state_info:drivers.full_status.terminated')}
            </Item>
        )
    }
];

const payout_receiver_options = (t: TFunction) => [
    {
        value: DriverModel_PayoutReceiver.DRIVER,
        label: t('modals:drivers.edit.payout_receiver.driver')
    },
    {
        value: DriverModel_PayoutReceiver.VENDOR,
        label: t('modals:drivers.edit.payout_receiver.vendor')
    }
];

export default {
    type_options,
    status_options,
    payout_receiver_options
};
