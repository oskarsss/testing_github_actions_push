/* eslint-disable max-len */

import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import ManifestLoadStopStatusChipSelect from '@/@core/fields/chip-select/ManifestLoadStopStatusChipSelect';
import ManifestStopStatusChipSelect from '@/@core/fields/chip-select/ManifestStopStatusChipSelect';
import { Stack } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { getDateRange } from '@/utils/get-daterange';
import { LoadStopTypes } from '@/models/loads/load-stop';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import GoogleMapsButton from '@/@core/ui-kits/basic/google-maps-button/GoogleMapsButton';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    loadId?: string;
    selectedStopId: string | null;
    selectStop: (stopId: string | null) => void;
    manifestId: string;
    isSystemStop?: boolean;
};

export default function MiniStopItemHeader({
    stop,
    selectStop,
    selectedStopId,
    manifestId,
    isSystemStop = false
}: Props) {
    const { t } = useAppTranslation();

    const rangeDateFormat = getDateRange(
        stop.appointmentStartAtLocal,
        stop.appointmentEndAtLocal,
        stop.location?.timezone,
        t
    ).split(`${t('common:time.time')}`);

    const selectStopHandler = () => selectStop(stop.stopId === selectedStopId ? null : stop.stopId);
    const stopType =
        stop.originType === ManifestsTypes.OriginType.LOAD
            ? LoadStopTypes[stop.loadStopType]
            : ManifestStopTypes[stop.manifestStopType];

    return (
        <Stack
            direction="column"
            gap="6px"
        >
            <StopsComponents.StopItemRow sx={{ gap: '12px' }}>
                <StopsComponents.HeaderText
                    fontWeight={600}
                    textColor="primary"
                >
                    {t(`state_info:stop.type.${stopType}`)}
                </StopsComponents.HeaderText>
                {stop.originType === ManifestsTypes.OriginType.LOAD && !isSystemStop && (
                    <ManifestLoadStopStatusChipSelect
                        status={stop.loadStopStatus}
                        loadId={stop.loadId}
                        manifestId={manifestId}
                        stopId={stop.stopId}
                        styles={{ minWidth: '115px' }}
                        size="small"
                    />
                )}
                {stop.originType === ManifestsTypes.OriginType.MANIFEST && !isSystemStop && (
                    <ManifestStopStatusChipSelect
                        loadId={stop.loadId}
                        manifestId={manifestId}
                        status={stop.manifestStopStatus}
                        stopId={stop.stopId}
                        styles={{ minWidth: '115px' }}
                        size="small"
                    />
                )}
                {isSystemStop && stop.location && (
                    <>
                        <StopsComponents.Text
                            sx={{
                                overflow    : 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {stop.location.address}
                        </StopsComponents.Text>
                        <GoogleMapsButton
                            lat={stop.location.lat}
                            lon={stop.location.lon}
                            padding={0}
                        />
                    </>
                )}
            </StopsComponents.StopItemRow>

            <StopsComponents.StopItemRow>
                <StopsComponents.Text textColor="secondary">{rangeDateFormat}</StopsComponents.Text>

                <StopsComponents.Text
                    sx={{
                        cursor: 'pointer'
                    }}
                    onClick={selectStopHandler}
                    textColor="secondary"
                >
                    {stop.location
                        ? `${stop.location.city || '-'}, ${stop.location.state || '-'}`
                        : '-'}
                </StopsComponents.Text>
            </StopsComponents.StopItemRow>
        </Stack>
    );
}
