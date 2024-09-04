import { SETTLEMENTS_STATUS_ICONS } from '@/@core/theme/entities/settlement/status';
import { styled } from '@mui/material/styles';
import type { AppPalette } from '@/@core/theme/palette';

import { SETTLEMENT_STATUS } from '@/models/settlements/settlement-status';
import { IntlMessageKey } from '@/@types/next-intl';

export const Wrapper = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    svg          : {
        width : 23,
        height: 23
    },
    span: {
        marginLeft: 5
    }
}));

namespace EditSettlementConfig {
    export const statuses_options = (
        t: (key: IntlMessageKey) => string
    ): {
        value: SETTLEMENT_STATUS;
        label: () => JSX.Element;
        foregroundType: keyof AppPalette['utility']['foreground'];
    }[] => [
        {
            value: SETTLEMENT_STATUS.OPEN,
            label: () => (
                <Wrapper>
                    {SETTLEMENTS_STATUS_ICONS.open}
                    <span>{t('state_info:settlements.status.open')}</span>
                </Wrapper>
            ),
            foregroundType: 'warning'
        },
        {
            value: SETTLEMENT_STATUS.IN_REVIEW,
            label: () => (
                <Wrapper>
                    {SETTLEMENTS_STATUS_ICONS.in_review}
                    <span>{t('state_info:settlements.status.in_review')}</span>
                </Wrapper>
            ),
            foregroundType: 'blue_dark'
        },
        {
            value: SETTLEMENT_STATUS.VERIFIED,
            label: () => (
                <Wrapper>
                    {SETTLEMENTS_STATUS_ICONS.verified}
                    <span>{t('state_info:settlements.status.verified')}</span>
                </Wrapper>
            ),
            foregroundType: 'success'
        },
        {
            value: SETTLEMENT_STATUS.CLOSED,
            label: () => (
                <Wrapper>
                    {SETTLEMENTS_STATUS_ICONS.closed}
                    <span>{t('state_info:settlements.status.closed')}</span>
                </Wrapper>
            ),
            foregroundType: 'indigo'
        },
        {
            value: SETTLEMENT_STATUS.SENT,
            label: () => (
                <Wrapper>
                    {SETTLEMENTS_STATUS_ICONS.sent}
                    <span>{t('state_info:settlements.status.sent')}</span>
                </Wrapper>
            ),
            foregroundType: 'violet'
        },
        {
            value: SETTLEMENT_STATUS.PAID,
            label: () => (
                <Wrapper>
                    {SETTLEMENTS_STATUS_ICONS.paid}
                    <span>{t('state_info:settlements.status.paid')}</span>
                </Wrapper>
            ),
            foregroundType: 'gray'
        }
    ];
}

export default EditSettlementConfig;
