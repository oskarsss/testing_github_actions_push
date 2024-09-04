/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */

import ManifestsTypes from '@/store/dispatch/manifests/types';
import { getDateRange } from '@/utils/get-daterange';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React from 'react';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import ManifestLoadStopStatusChipSelect from '@/@core/fields/chip-select/ManifestLoadStopStatusChipSelect';
import ManifestStopStatusChipSelect from '@/@core/fields/chip-select/ManifestStopStatusChipSelect';
import { useEditManifestStopDialog } from '@/views/dispatch/manifests/modals/manifest-stop/EditManifestStop';
import { useEditLoadStopDialog } from '@/views/dispatch/manifests/modals/load-stop/EditLoadStop';
import VectorIcons from '@/@core/icons/vector_icons';
import { LoadStopTypes } from '@/models/loads/load-stop';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import GoogleMapsButton from '@/@core/ui-kits/basic/google-maps-button/GoogleMapsButton';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    manifestId: string;
    isShortStop: boolean;
};

export default function FullStopItemHeader({
    stop,
    manifestId,
    isShortStop
}: Props) {
    const { t } = useAppTranslation();
    const editManifestStopDialog = useEditManifestStopDialog();
    const editLoadStopDialog = useEditLoadStopDialog();

    const onEditStop = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (stop.originType === ManifestsTypes.OriginType.MANIFEST) {
            editManifestStopDialog.open({
                manifestId,
                stop
            });
        } else {
            editLoadStopDialog.open({
                stop,
                manifestId
            });
        }
    };

    const rangeDateFormat = getDateRange(
        stop.appointmentStartAtLocal,
        stop.appointmentEndAtLocal,
        stop.location?.timezone,
        t
    ).split(`${t('common:time.time')}`);

    const stopType =
        stop.originType === ManifestsTypes.OriginType.LOAD
            ? LoadStopTypes[stop.loadStopType]
            : ManifestStopTypes[stop.manifestStopType];

    return (
        <StopsComponents.StopItemRow sx={{ width: '100%' }}>
            <StopsComponents.StopItemRowWrapper sx={{ overflow: 'hidden' }}>
                <StopsComponents.StopItemRowWrapper
                    sx={{ gap: '6px !important', overflow: 'hidden' }}
                >
                    <StopsComponents.HeaderText
                        fontWeight={600}
                        textColor="primary"
                    >
                        {t(`state_info:stop.type.${stopType}`)}
                    </StopsComponents.HeaderText>

                    <StopsComponents.HeaderText textColor="disabled">//</StopsComponents.HeaderText>

                    <StopsComponents.HeaderText textColor="secondary">
                        {rangeDateFormat}
                    </StopsComponents.HeaderText>

                    {isShortStop && stop.location && (
                        <>
                            <StopsComponents.HeaderText textColor="disabled">
                                //
                            </StopsComponents.HeaderText>
                            <StopsComponents.HeaderText
                                textColor="secondary"
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >
                                {stop.location.address}
                            </StopsComponents.HeaderText>
                            <GoogleMapsButton
                                lat={stop.location.lat}
                                lon={stop.location.lon}
                            />
                        </>
                    )}
                </StopsComponents.StopItemRowWrapper>
            </StopsComponents.StopItemRowWrapper>

            <StopsComponents.StopItemRowWrapper>
                <StopsComponents.EditButton
                    className="edit-stop-button"
                    onClick={onEditStop}
                    startIcon={<VectorIcons.PenIcon color="primary" />}
                >
                    {t('common:button.edit')}
                </StopsComponents.EditButton>

                {!isShortStop && (
                    <StopsComponents.StopItemRowWrapper>
                        {stop.originType === ManifestsTypes.OriginType.LOAD ? (
                            <ManifestLoadStopStatusChipSelect
                                status={stop.loadStopStatus}
                                loadId={stop.loadId}
                                manifestId={manifestId}
                                stopId={stop.stopId}
                                styles={{ minWidth: '115px' }}
                                size="small"
                            />
                        ) : (
                            <ManifestStopStatusChipSelect
                                manifestId={manifestId}
                                loadId={stop.loadId}
                                status={stop.manifestStopStatus}
                                stopId={stop.stopId}
                                styles={{ minWidth: '115px' }}
                                size="small"
                            />
                        )}
                    </StopsComponents.StopItemRowWrapper>
                )}
            </StopsComponents.StopItemRowWrapper>
        </StopsComponents.StopItemRow>
    );
}
