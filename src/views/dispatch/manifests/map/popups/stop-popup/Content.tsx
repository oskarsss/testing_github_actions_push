/* eslint-disable max-len */
import { Box, Stack, styled, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import {
    MANIFEST_LOAD_STOP_ICONS,
    MANIFEST_STOP_STATUS_ICONS
} from '@/@core/theme/entities/manifests/stop-status';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import {
    ManifestModel_ManifestStop_Status,
    ManifestModel_ManifestStop_Type
} from '@proto/models/model_manifest';
import StopTypeChipSelect from '@/@core/fields/chip-select/StopTypeChipSelect';
import VectorIcons from '@/@core/icons/vector_icons';
import { formatMinutes } from '@/utils/formatting';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import moment from 'moment-timezone';
import { PreparedMapStop } from '../../utils';

type Props = {
    stop: PreparedMapStop;
};

const Container = styled('div')(({ theme }) => ({
    width          : '100%',
    height         : '100%',
    minWidth       : '260px',
    position       : 'relative',
    display        : 'flex',
    minHeight      : '42px',
    backgroundColor: theme.palette.semantic.foreground.white.primary,
    borderRadius   : '4px',
    cursor         : 'pointer',
    gap            : '8px',
    boxSizing      : 'border-box',
    flexDirection  : 'column',
    padding        : '6px'
}));

const EtaTypeWrapper = styled('div')<{
    color: 'error' | 'success' | 'gray';
}>(({
    theme,
    color
}) => ({
    display       : 'flex',
    flexDirection : 'row',
    gap           : '8px',
    alignItems    : 'center',
    justifyContent: 'center',
    boxSizing     : 'border-box',
    div           : {
        borderRadius   : '4px',
        padding        : '4px',
        backgroundColor: theme.palette.utility.foreground[color].secondary,
        display        : 'flex',
        flexDirection  : 'row',
        gap            : '2px',
        alignItems     : 'center',
        justifyContent : 'center',
        maxHeight      : '20px',
        svg            : {
            width : '16px',
            height: '16px',
            fill  : theme.palette.utility.foreground[color].primary
        },
        '.MuiTypography-root': {
            color     : theme.palette.utility.foreground[color].primary,
            fontSize  : '12px',
            fontWeight: 500
        }
    }
}));

const AddressTitle = styled(Typography)(({ theme }) => ({
    fontSize  : '12px',
    color     : theme.palette.semantic.text.primary,
    fontWeight: 600
}));

const IconWrapper = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    svg           : {
        width : '16px',
        height: '16px'
    }
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize  : '10px',
    color     : theme.palette.semantic.text.disabled,
    fontWeight: 500
}));

const Time = styled(Typography)(({ theme }) => ({
    fontSize  : '12px',
    color     : theme.palette.semantic.text.primary,
    fontWeight: 500
}));

function StopMarkerPopupContent({ stop }: Props) {
    const { t } = useAppTranslation();
    const icon =
        stop.originType === ManifestsTypes.OriginType.LOAD
            ? MANIFEST_LOAD_STOP_ICONS[stop.status]
            : MANIFEST_STOP_STATUS_ICONS[stop.status as ManifestModel_ManifestStop_Status];
    // eslint-disable-next-line no-nested-ternary
    const etaType = stop.lateness > 0 ? 'error' : stop.earliness > 0 ? 'success' : 'none';

    const hideFields = useMemo(() => {
        if (
            stop.originType === ManifestsTypes.OriginType.MANIFEST &&
            [ManifestModel_ManifestStop_Type.START, ManifestModel_ManifestStop_Type.END].includes(
                stop.type as ManifestModel_ManifestStop_Type
            )
        ) {
            return true;
        }
        return false;
    }, [stop.originType, stop.type]);

    const reqTime = {
        month: moment(stop.appointmentStartAt).format('MMM'),
        day  : moment(stop.appointmentStartAt).format('D'),
        time : moment(stop.appointmentStartAt).format('H:mm')
    };

    const reqTimeTitle = useMemo(() => {
        if (!hideFields) {
            return t('modals:manifests.details.map.pop_up.req_time');
        }
        if (stop.type === ManifestModel_ManifestStop_Type.START) {
            return 'Start time';
        }
        if (stop.type === ManifestModel_ManifestStop_Type.END) {
            return 'End time';
        }
        return '';
    }, [hideFields, stop.type, t]);

    return (
        <Container>
            <Stack
                direction="row"
                gap={2}
                flex="1 1 100%"
                justifyContent="space-between"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    <IconWrapper>{icon}</IconWrapper>
                    <AddressTitle noWrap>
                        {stop.state}, {stop.city}
                    </AddressTitle>
                </Stack>

                <StopTypeChipSelect
                    originType={stop.originType}
                    type={stop.type}
                    size="small"
                    is_changing={false}
                    show_arrow={false}
                />
            </Stack>
            <Stack
                flex="1 1 100%"
                direction="row"
                justifyContent="space-between"
            >
                <Stack>
                    <SubTitle noWrap>{reqTimeTitle}</SubTitle>
                    <Time noWrap>
                        {reqTime.month} {reqTime.day}, {reqTime.time}
                    </Time>
                </Stack>
                {!stop.isCompleted ? (
                    <Stack
                        direction="row"
                        gap={1}
                    >
                        {etaType === 'error' && (
                            <EtaTypeWrapper color="error">
                                <div>
                                    <VectorIcons.RushingTimeIcon color="error" />
                                    <Typography
                                        noWrap
                                        variant="body1"
                                        color="initial"
                                    >
                                        {formatMinutes(stop.lateness, t)}
                                    </Typography>
                                </div>
                            </EtaTypeWrapper>
                        )}
                        {etaType === 'success' && (
                            <EtaTypeWrapper color="success">
                                <div>
                                    <VectorIcons.RushingTimeIcon color="success" />
                                    <Typography
                                        noWrap
                                        variant="body1"
                                        color="initial"
                                    >
                                        {formatMinutes(stop.earliness, t)}
                                    </Typography>
                                </div>
                            </EtaTypeWrapper>
                        )}
                        <EtaTypeWrapper color="gray">
                            <div>
                                <VectorIcons.LocationIcon />
                                <Typography
                                    noWrap
                                    variant="body1"
                                    color="initial"
                                >
                                    {formatMinutes(stop.eta, t)}
                                </Typography>
                            </div>
                        </EtaTypeWrapper>
                    </Stack>
                ) : (
                    !hideFields && (
                        <Stack>
                            <SubTitle noWrap>
                                {t('modals:manifests.details.map.pop_up.arr_time')}
                            </SubTitle>
                            <Time noWrap>
                                {stop.arrivedAt
                                    ? moment(stop.arrivedAt).format('MM/DD/YYYY, HH:mm')
                                    : '-'}
                            </Time>
                        </Stack>
                    )
                )}
            </Stack>
        </Container>
    );
}

export default StopMarkerPopupContent;
