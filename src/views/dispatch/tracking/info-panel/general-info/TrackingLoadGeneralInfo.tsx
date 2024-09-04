import { Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import CopyText from '@/@core/components/copy-text/CopyText';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import openNewTab from '@/utils/openNewTab';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    loadRefId: string;
    loadFriendlyId?: string;
    brokerId: string;
    customerId: string;
    loadId: string;
};

function TrackingLoadGeneralInfo({
    loadFriendlyId,
    loadRefId,
    loadId,
    brokerId,
    customerId
}: Props) {
    const { t } = useAppTranslation();
    const broker = useBrokersMap(brokerId);
    const customer = useCustomersMap(customerId);
    const clientName =
        (brokerId ? broker?.name : customer?.name) || `N/A${broker?.mc ? ` (${broker.mc})` : ''}`;

    const openOrderNewTab = () => openNewTab(APP_ROUTES_CONFIG.dispatch.orders.details(loadId));

    return (
        <Stack
            borderBottom={({ palette }) => `1px solid ${palette.semantic.border.primary}`}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingY="6px"
            gap="8px"
            overflow="hidden"
            minHeight="45px"
        >
            <Tooltip
                placement="top"
                title={t('common:tooltips.open_in_new_tab')}
            >
                <Typography
                    noWrap
                    fontSize="20px"
                    fontWeight={600}
                    overflow="visible"
                    onClick={openOrderNewTab}
                    color={(theme) => theme.palette.semantic.text.brand.primary}
                    sx={{
                        cursor        : 'pointer',
                        textDecoration: 'underline',
                        transition    : 'color 0.3s',

                        '&:hover': {
                            color: (theme) => theme.palette.semantic.text.brand.secondary
                        }
                    }}
                >
                    {t('common:loads.friendlyId', { friendlyId: loadFriendlyId })}
                </Typography>
            </Tooltip>
            <Stack
                direction="column"
                overflow="hidden"
            >
                <CopyText text={loadRefId}>
                    <Typography
                        fontWeight={500}
                        fontSize="12px"
                        textAlign="right"
                        lineHeight="15px"
                        variant="body1"
                    >
                        #{loadRefId}
                    </Typography>
                </CopyText>
                <CopyText text={clientName}>
                    <Typography
                        color="#596372"
                        fontWeight={500}
                        lineHeight="14px"
                        fontSize="12px"
                        textTransform="capitalize"
                        textAlign="right"
                        variant="body2"
                        noWrap
                    >
                        {clientName}
                    </Typography>
                </CopyText>
            </Stack>
        </Stack>
    );
}

export default React.memo(TrackingLoadGeneralInfo);
