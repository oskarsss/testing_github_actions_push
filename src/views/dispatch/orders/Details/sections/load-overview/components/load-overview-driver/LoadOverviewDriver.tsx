import CopyText from '@/@core/components/copy-text/CopyText';
import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import openNewWindow from '@/utils/open-new-window';
import ArrowButton from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/ArrowButton';
import OverviewDriverAvatar from '@/@core/components/overview-driver-avatar/OverviewDriverAvatar';
import { formatPhoneNumber } from '@/utils/formatting';
import { Stack, Tooltip } from '@mui/material';
import { useLastDriverPing } from '@/store/streams/events/hooks';
import MoreDriversBadge from '@/@core/components/overview-driver-avatar/MoreDriversBadge';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ManifestNoDriver from '@/@core/components/manifest-no-driver/ManifestNoDriver';
import React from 'react';
import { useDriverById } from '@/store/storage/drivers/hooks/common';

type Props = {
    driverIds: string[];
    primaryDriverId: string;
    manifestId: string;
};

function LoadOverviewDriver({
    driverIds,
    primaryDriverId,
    manifestId
}: Props) {
    const ping = useLastDriverPing(primaryDriverId);
    const driver = useDriverById(primaryDriverId);
    const { t } = useAppTranslation('common');

    if (!driver) return <ManifestNoDriver manifestId={manifestId} />;

    const openDriver = () => openNewWindow(`drivers/${primaryDriverId}`, true);

    const full_name_formatting = `${driver.firstName || ''} ${driver.lastName || ''}`;
    const otherDriverIds = driverIds.length > 1 ? driverIds.slice(1, driverIds.length) : [];

    return (
        <LoadOverviewStyled.Item.Container
            sx={{
                flex: '1.3 1 0'
            }}
        >
            <Stack
                ml="3px"
                mb="3px"
            >
                <MoreDriversBadge driverIds={otherDriverIds}>
                    <OverviewDriverAvatar
                        driverTypeId={driver.driverTypeId}
                        selfieThumbUrl={driver.selfieThumbUrl}
                        fullName={full_name_formatting}
                    />
                </MoreDriversBadge>
            </Stack>

            <LoadOverviewStyled.Item.InfoWrapper>
                <CopyText text={full_name_formatting}>
                    <LoadOverviewStyled.Item.Title
                        sx={{
                            overflow: 'visible',
                            textWrap: 'wrap'
                        }}
                    >
                        {full_name_formatting}
                    </LoadOverviewStyled.Item.Title>
                </CopyText>

                <Stack
                    flexDirection="row"
                    alignItems="center"
                >
                    {!ping && (
                        <Tooltip title={t('tooltips.not_using_the_app')}>
                            <Stack>
                                <VectorIcons.PhoneCrossMarkIcon sx={{ fontSize: '13px' }} />
                            </Stack>
                        </Tooltip>
                    )}
                    <CopyText text={driver.phoneNumber}>
                        <LoadOverviewStyled.Item.Description sx={{ overflow: 'visible' }}>
                            {formatPhoneNumber(driver.phoneNumber) || '-'}
                        </LoadOverviewStyled.Item.Description>
                    </CopyText>
                </Stack>
            </LoadOverviewStyled.Item.InfoWrapper>

            <ArrowButton onClick={openDriver} />
        </LoadOverviewStyled.Item.Container>
    );
}

export default React.memo(LoadOverviewDriver);
