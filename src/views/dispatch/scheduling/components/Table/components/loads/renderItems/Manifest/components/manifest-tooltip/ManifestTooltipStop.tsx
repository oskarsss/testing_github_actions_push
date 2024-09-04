import ManifestsTypes from '@/store/dispatch/manifests/types';
import ManifestTooltipStyled from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/manifest-tooltip/styled';
import { Stack } from '@mui/material';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import StopTypeChipSelect from '@/@core/fields/chip-select/StopTypeChipSelect';
import StopItemDistance from '@/@core/ui-kits/loads/load-stop/StopItemDistance';
import {
    prepareStartDate,
    prepareEndDate
} from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/manifest-tooltip/utils';
import {
    ManifestModel_ManifestStop_Type,
    ManifestModel_Status
} from '@proto/models/model_manifest';
import { isCompletedManifest } from '@/@grpcServices/services/manifests-service/utils';
import { isCompletedStop } from '@/utils/load-stops';
import VectorIcons from '@/@core/icons/vector_icons';
import { AppPalette } from '@/@core/theme/palette';
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    manifestStatus: ManifestModel_Status;
    truckId: string;
};
export default function ManifestTooltipStop({
    stop,
    manifestStatus,
    truckId
}: Props) {
    const { t } = useAppTranslation();
    const completedManifest = isCompletedManifest(manifestStatus);

    const truck_route = useManifestTruckRoute(truckId);
    const stopEta = truck_route?.find((etaStop) => etaStop.localeStopId === stop.stopId);

    const isPickup = [ManifestModel_ManifestStop_Type.PICKUP, LoadModel_Stop_Type.pickup].includes(
        stop.loadStopType
    );

    const endDate = prepareEndDate(stop, completedManifest);
    const startDate = prepareStartDate(stop, completedManifest);
    const stopIsCompleted = isCompletedStop(stop);

    const getColorStopTime = (palette: AppPalette) => {
        if (![ManifestModel_Status.IN_PROGRESS].includes(manifestStatus)) return undefined;
        if (!stopEta) return undefined;
        const isLate = stopEta.lateness > 0 || stopEta.earliness === 0;
        const isEarly = stopEta.earliness > 0;
        if (!isLate && !isEarly) return undefined;
        return isLate ? palette.utility.text.error : palette.utility.text.success;
    };

    return (
        <Stack>
            <ManifestTooltipStyled.Row>
                <ManifestTooltipStyled.RowWrap>
                    {stopIsCompleted ? (
                        <Badge
                            variant="outlined"
                            icon={<VectorIcons.Check />}
                            sx={{ padding: 0, minWidth: '22px' }}
                            iconColor={({ palette }) => palette.utility.foreground.success.primary}
                            borderColor={({ palette }) =>
                                palette.utility.foreground.success.secondary}
                            backgroundColor={({ palette }) =>
                                palette.utility.foreground.success.tertiary}
                        />
                    ) : (
                        <Badge
                            variant="outlined"
                            text={stop.sequence}
                            sx={{ minWidth: '22px' }}
                        />
                    )}
                    {stop.loadFriendlyId && (
                        <Badge
                            variant="outlined"
                            icon={<VectorIcons.CubeIcon />}
                            text={
                                stop.loadId
                                    ? t('common:loads.friendlyId', {
                                        friendlyId: stop.loadFriendlyId
                                    })
                                    : '-'
                            }
                            sx={{ minWidth: '50px' }}
                        />
                    )}
                    <StopTypeChipSelect
                        originType={stop.originType}
                        type={stop.loadStopType || stop.manifestStopType}
                        size="small"
                        show_arrow={false}
                        is_changing={false}
                        styles={{ minWidth: '110px' }}
                    />
                </ManifestTooltipStyled.RowWrap>
                <ManifestTooltipStyled.RowWrap>
                    {stop.location && (
                        <>
                            <ManifestTooltipStyled.Text textColor="secondary">
                                {`${stop.location.city || '-'}, ${stop.location.state || '-'}`}
                            </ManifestTooltipStyled.Text>
                            <ManifestTooltipStyled.Text textColor="secondary">
                                •
                            </ManifestTooltipStyled.Text>
                        </>
                    )}

                    <ManifestTooltipStyled.Text
                        sx={{ color: (theme) => getColorStopTime(theme.palette) }}
                    >
                        {isPickup ? startDate : endDate}
                    </ManifestTooltipStyled.Text>
                </ManifestTooltipStyled.RowWrap>
            </ManifestTooltipStyled.Row>
            <StopItemDistance distance={stop.distanceToNextStop} />
        </Stack>
    );
}
