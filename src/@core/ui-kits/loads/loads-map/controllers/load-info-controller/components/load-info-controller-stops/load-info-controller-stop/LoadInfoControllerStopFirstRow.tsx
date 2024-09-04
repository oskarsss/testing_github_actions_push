import { Stop } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/LoadInfoControllerStops';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import StopTypeChipSelect from '@/@core/fields/chip-select/StopTypeChipSelect';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { formatMinutes } from '@/utils/formatting';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React, { useMemo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import ManifestLoadStopStatusChipSelect from '@/@core/fields/chip-select/ManifestLoadStopStatusChipSelect';
import ManifestStopStatusChipSelect from '@/@core/fields/chip-select/ManifestStopStatusChipSelect';
import {
    ManifestModel_LoadStop_Status,
    ManifestModel_ManifestStop_Status
} from '@proto/models/model_manifest';
import { Stack, styled } from '@mui/material';

type Props = {
    stop: Stop;
    manifestId: string;
};

const Container = styled('div')(({ theme }) => ({
    display                       : 'flex',
    flexDirection                 : 'row',
    alignItems                    : 'center',
    justifyContent                : 'space-between',
    gap                           : '4px',
    width                         : '100%',
    [theme.breakpoints.down(1850)]: {
        flexDirection: 'column',
        alignItems   : 'flex-start'
    }
}));

const EtaContainer = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'flex-end',
    gap           : '4px',
    width         : '100%'

    // [theme.breakpoints.down(1700)]: {
    // justifyContent: 'flex-end'
    // }
}));

const GeneralContainer = styled('div')(({ theme }) => ({
    display                       : 'flex',
    flexDirection                 : 'row',
    alignItems                    : 'center',
    gap                           : '4px',
    width                         : '100%',
    [theme.breakpoints.down(1850)]: {
        justifyContent: 'space-between'
    }
}));

export default function LoadInfoControllerStopFirstRow({
    stop,
    manifestId
}: Props) {
    const { t } = useAppTranslation();

    const time = useMemo(() => {
        const isLate = stop.lateness > 0 || stop.earliness === 0;
        const isEarly = stop.earliness > 0;
        if (!isLate && !isEarly) return undefined;

        const time = isLate ? stop.lateness : stop.earliness;
        const format_time = formatMinutes(time, t);

        const isCorrectTime = format_time && format_time !== t('common:not_provided');
        if (!isCorrectTime) return undefined;

        return {
            format_time,
            color: isLate ? ('error' as const) : ('success' as const)
        };
    }, [stop.lateness, stop.earliness, t]);

    const etaTime = formatMinutes(stop.eta, t);
    const etaTimeIsCorrect = etaTime && etaTime !== t('common:not_provided');

    return (
        <Container>
            <GeneralContainer>
                <Stack direction="row">
                    <Badge
                        variant="outlined"
                        size="small"
                        text={stop.sequence}
                    />
                    <StopTypeChipSelect
                        originType={stop.originType}
                        type={stop.loadStopType || stop.manifestStopType}
                        size="small"
                        show_arrow={false}
                        is_changing={false}
                        styles={{ minWidth: '110px' }}
                        stylesText={{ textTransform: 'uppercase' }}
                    />
                </Stack>
                {stop.originType === ManifestsTypes.OriginType.LOAD ? (
                    <ManifestLoadStopStatusChipSelect
                        status={stop.loadStopStatus}
                        loadId={stop.loadId}
                        manifestId={manifestId}
                        stopId={stop.stopId}
                        size="small"
                        show_arrow={false}
                        is_changing={false}
                        styles={{ minWidth: 'unset' }}
                    />
                ) : (
                    <ManifestStopStatusChipSelect
                        loadId={stop.loadId}
                        manifestId={manifestId}
                        status={stop.manifestStopStatus}
                        stopId={stop.stopId}
                        size="small"
                        show_arrow={false}
                        is_changing={false}
                        styles={{ minWidth: 'unset' }}
                    />
                )}
            </GeneralContainer>
            <EtaContainer>
                {time && (
                    <Badge
                        variant="filled"
                        size="small"
                        text={time.format_time}
                        utilityColor={time.color}
                        backgroundColor={({ palette }) =>
                            palette.utility.foreground[time.color].tertiary}
                        textColor={({ palette }) => palette.semantic.text.error}
                        icon={<VectorIcons.RushingTimeIcon />}
                    />
                )}
                {etaTimeIsCorrect && (
                    <Badge
                        variant="filled"
                        size="small"
                        text={etaTime}
                        backgroundColor={(theme) => theme.palette.semantic.foreground.secondary}
                        textColor={(theme) => theme.palette.semantic.text.primary}
                        iconColor={(theme) => theme.palette.semantic.foreground.primary}
                        icon={<VectorIcons.LocationIcon />}
                    />
                )}
            </EtaContainer>
        </Container>
    );
}
