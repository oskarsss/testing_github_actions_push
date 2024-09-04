import React from 'react';
import { Fade, styled } from '@mui/material';
import {
    DropOffIcon,
    PickUpAndDropOffIcon,
    PickupIcon
} from '@/@core/theme/entities/load/load_stop_icons';
import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import type { TFunction } from '@/@types/next-intl';

export type OptionType = {
    value: LoadStopTypesEnum;
    label: (t: TFunction) => React.ReactNode;
    indicator: (value: number) => React.ReactNode;
};

const PickUpIndicator = styled('div')(({ theme }) => ({
    position      : 'relative',
    width         : 32,
    minWidth      : 32,
    height        : 32,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    background    : '#D1FADF',
    borderRadius  : '100%',
    '&::before'   : {
        content     : "''",
        position    : 'absolute',
        zIndex      : 1,
        left        : 4,
        top         : 4,
        width       : 24,
        height      : 24,
        borderRadius: '100%',
        background  : '#32D583'
    },
    span: {
        position  : 'relative',
        zIndex    : 2,
        fontWeight: 600,
        fontSize  : 14,
        color     : theme.palette.semantic.background.primary
    }
}));

const DropOffIndicator = styled('div')(({ theme }) => ({
    position      : 'relative',
    width         : 32,
    minWidth      : 32,
    height        : 32,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    background    : '#FEE4E2',
    borderRadius  : '100%',
    '&::before'   : {
        content     : "''",
        position    : 'absolute',
        zIndex      : 1,
        left        : 4,
        top         : 4,
        width       : 24,
        height      : 24,
        borderRadius: '100%',
        background  : '#F97066'
    },
    span: {
        position  : 'relative',
        zIndex    : 2,
        fontWeight: 600,
        fontSize  : 14,
        color     : theme.palette.semantic.background.primary
    }
}));

const PickupAndDropOffIndicator = styled('div')(({ theme }) => ({
    position      : 'relative',
    width         : 32,
    minWidth      : 32,
    height        : 32,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    background    : '#FEE4E2',
    borderRadius  : '100%',
    '&::before'   : {
        content     : "''",
        position    : 'absolute',
        zIndex      : 1,
        left        : 4,
        top         : 4,
        width       : 24,
        height      : 24,
        borderRadius: '100%',
        background  : '#ffd237'
    },
    span: {
        position  : 'relative',
        zIndex    : 2,
        fontWeight: 600,
        fontSize  : 14,
        color     : theme.palette.semantic.background.primary
    }
}));

export const STOP_TYPE_OPTIONS_ARRAY: OptionType[] = [
    {
        value: LoadStopTypesEnum.PICKUP,
        label: (t) => (
            <Fade in>
                <div
                    style={{
                        display       : 'flex',
                        flexDirection : 'row',
                        justifyContent: 'flex-start',
                        alignItems    : 'center',
                        textTransform : 'capitalize'
                    }}
                >
                    <PickupIcon styles={{ marginRight: 8 }} />
                    {t('state_info:stop.type.pickup')}
                </div>
            </Fade>
        ),
        indicator: (value) => (
            <PickUpIndicator>
                <span>{value}</span>
            </PickUpIndicator>
        )
    },
    {
        value: LoadStopTypesEnum.DROPOFF,
        label: (t) => (
            <Fade in>
                <div
                    style={{
                        display       : 'flex',
                        flexDirection : 'row',
                        justifyContent: 'flex-start',
                        alignItems    : 'center',
                        textTransform : 'capitalize'
                    }}
                >
                    <DropOffIcon styles={{ marginRight: 8 }} />
                    {t('state_info:stop.type.dropoff')}
                </div>
            </Fade>
        ),
        indicator: (value) => (
            <DropOffIndicator>
                <span>{value}</span>
            </DropOffIndicator>
        )
    },
    {
        value: LoadStopTypesEnum.PICKUP_DROPOFF,
        label: (t) => (
            <Fade in>
                <div
                    style={{
                        display       : 'flex',
                        flexDirection : 'row',
                        justifyContent: 'flex-start',
                        alignItems    : 'center',
                        textTransform : 'capitalize'
                    }}
                >
                    <PickUpAndDropOffIcon styles={{ marginRight: 8 }} />
                    {t('state_info:stop.type.pickup_dropoff')}
                </div>
            </Fade>
        ),
        indicator: (value) => (
            <PickupAndDropOffIndicator>
                <span>{value}</span>
            </PickupAndDropOffIndicator>
        )
    }
];

export const STOP_TYPE_OPTIONS_MAP = STOP_TYPE_OPTIONS_ARRAY.reduce((acc, option) => {
    acc[option.value] = option;
    return acc;
}, {} as Record<LoadStopTypesEnum, OptionType>);
