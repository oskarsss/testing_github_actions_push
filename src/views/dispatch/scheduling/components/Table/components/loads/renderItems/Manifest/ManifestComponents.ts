/* eslint-disable no-nested-ternary */

import { styled } from '@mui/material/styles';
import { PositionType } from '@/views/dispatch/scheduling/components/Table/types';
import {
    LOAD_HEIGHT,
    LOAD_WIDTH_SIZE
} from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/contants';
import { Typography } from '@mui/material';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { MANIFEST_STATUS_GRPC_COLORS } from '@/@core/theme/entities/manifests/status';

type ContainerItemProps = {
    widthLoad: number;
    status: ManifestModel_Status;
    errorSize: boolean;
    position: PositionType;
    overWidth?: boolean;
};

const Container = styled('div')<ContainerItemProps>(
    ({
        theme,
        widthLoad,
        status,
        errorSize,
        position,
        overWidth
    }) => {
        const color = MANIFEST_STATUS_GRPC_COLORS[status];
        const height =
            status === ManifestModel_Status.CANCELED ? LOAD_HEIGHT.small : LOAD_HEIGHT.large;
        return {
            minHeight               : height,
            maxHeight               : height,
            height                  : 'max-content',
            overflow                : 'hidden',
            top                     : '50%',
            bottom                  : '50%',
            transform               : 'translateY(-50%)',
            position                : 'absolute',
            zIndex                  : 9,
            display                 : 'flex',
            justifyContent          : 'space-between',
            alignItems              : 'center',
            boxShadow               : 'rgba(0, 0, 0, 0.1) 10px 0px 30px 0px',
            borderRadius            : 4,
            columnGap               : 4,
            padding                 : '2px 8px',
            cursor                  : 'pointer',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility      : 'hidden',
            willChange              : 'transform',
            transition              : 'left 0.3s, right 0.3s, box-shadow 0.3s, transform 0.2s linear',
            width                   : widthLoad,
            minWidth                : widthLoad,
            maxWidth                : widthLoad,
            background              : theme.palette.utility.foreground[color]?.tertiary,

            borderLeftStyle: 'solid',
            borderLeftWidth: 4,
            borderLeftColor: overWidth
                ? 'transparent'
                : theme.palette.utility.foreground[color]?.primary,

            borderRightStyle: 'solid',
            borderRightWidth: 4,
            borderRightColor: overWidth
                ? 'transparent'
                : theme.palette.utility.foreground[color]?.primary,

            '&:hover': {
                zIndex   : 10,
                boxShadow: '0 0 14px 0 rgb(0 0 0 / 20%)',
                transform: 'scale(1.005), translateY(-50%)',

                ...(position.right
                    ? {
                        right    : '0 !important',
                        transform: 'scale(1), translateY(-50%)'
                    }
                    : {
                        ...(Number(position.left) < 0
                            ? {
                                left     : '0 !important',
                                transform: 'scale(1), translateY(-50%)'
                            }
                            : {})
                    })
            },

            ...(errorSize
                ? {
                    width   : 50,
                    minWidth: 50,
                    maxWidth: 50,
                    outline : `4px dashed ${theme.palette.semantic.border.error.primary}`,
                    zIndex  : 10
                }
                : {}),

            ...(widthLoad <= LOAD_WIDTH_SIZE.medium
                ? {
                    flexDirection : 'column',
                    justifyContent: 'center'
                }
                : {}),

            ...(widthLoad <= LOAD_WIDTH_SIZE.extraSmall
                ? {
                    padding: 0
                }
                : {}),

            ...(position.right ? { right: `${position.right}px` } : { left: `${position.left}px` })
        };
    }
);

type StopContainerProps = {
    loadWidth: number;
    isFirstStop?: boolean;
};

const StopContainer = styled('div')<StopContainerProps>(({ loadWidth }) => ({
    display      : 'flex',
    flexDirection: 'column',
    overflow     : 'hidden',
    columnGap    : 4,
    flex         : '1 1 0',
    ...(loadWidth <= LOAD_WIDTH_SIZE.medium
        ? {
            flexDirection : 'row',
            justifyContent: loadWidth <= LOAD_WIDTH_SIZE.extraSmall ? 'center' : 'space-between',
            alignItems    : 'center',
            width         : '100%'
        }
        : {})
}));

type StopLocationProps = {
    isFirstStop?: boolean;
    loadWidth?: number;
};

const StopLocation = styled(Typography)<StopLocationProps>(
    ({
        theme,
        isFirstStop,
        loadWidth = LOAD_WIDTH_SIZE.extraSmall
    }) => ({
        display      : 'flex',
        flexDirection: 'row',
        alignItems   : 'center',
        fontSize     : 12,
        letterSpacing: 0.4,
        lineHeight   : 1.66,
        fontWeight   : 700,
        color        : theme.palette.semantic.text.primary,
        overflow     : 'hidden',
        whiteSpace   : 'nowrap',
        justifyContent:
            loadWidth <= LOAD_WIDTH_SIZE.extraSmall
                ? 'center'
                : isFirstStop
                    ? 'flex-start'
                    : 'flex-end',
        textAlign:
            loadWidth <= LOAD_WIDTH_SIZE.extraSmall ? 'center' : isFirstStop ? 'left' : 'right'
    })
);

const StopLocationCity = styled('span')({
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace  : 'nowrap'
});

const StopLocationState = styled('span')({
    whiteSpace: 'nowrap'
});

const StopTime = styled(Typography)(({ theme }) => ({
    margin       : 0,
    fontSize     : 12,
    letterSpacing: 0.4,
    lineHeight   : 1.66,
    fontWeight   : 500,
    color        : theme.palette.semantic.text.secondary,
    textWrap     : 'nowrap'
}));

const ManifestComponents = {
    Container,
    StopContainer,
    StopLocation,
    StopLocationCity,
    StopLocationState,
    StopTime
};

export default ManifestComponents;
