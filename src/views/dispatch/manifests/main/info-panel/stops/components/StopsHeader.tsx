import { Stack, Typography } from '@mui/material';
import BrandCheckbox from '@/@core/ui-kits/basic/brand-checkbox/BrandCheckbox';
import React, { type MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import LoadStopsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-stops-tab/LoadStops.styled';
import VectorIcons from '@/@core/icons/vector_icons';
import { StopOptionsMenu } from '@/views/dispatch/orders/menus/stop-options/StopOptions';

type Props = {
    manifestId: string;
    setTableMode: (mode: TableMode) => void;
    tableMode: TableMode;
    lastStopSequence: number;
    lastStopAppointmentEnd: string;
    children?: React.ReactNode;
    showCompleted: boolean;
    setShowCompleted: (value: boolean) => void;
    countCompleted: number;
    truckId: string;
};

function StopsHeader({
    showCompleted,
    setShowCompleted,
    countCompleted,
    manifestId,
    setTableMode,
    tableMode,
    lastStopSequence,
    lastStopAppointmentEnd,
    children,
    truckId
}: Props) {
    const { t } = useAppTranslation();
    const stopOptionsMenu = StopOptionsMenu();

    const onClickMoreOptions = (e: MouseEvent<HTMLButtonElement>) => {
        stopOptionsMenu.open({
            manifestId,
            setTableMode,
            lastStopSequence,
            lastStopAppointmentEnd,
            truckId
        })(e);
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="4px"
        >
            {tableMode !== TableMode.TAKE_ROUTE && (
                <Typography
                    color={(theme) => theme.palette.semantic.text.primary}
                    fontSize="16px"
                    fontWeight={600}
                >
                    {t('entity:stops')}
                </Typography>
            )}

            {children}
            {tableMode === TableMode.NONE && (
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="inherit"
                >
                    {countCompleted > 0 && (
                        <BrandCheckbox
                            checked={!!countCompleted && showCompleted}
                            disabled={!countCompleted}
                            variant="default"
                            setCheck={(value) => setShowCompleted(value)}
                            size="small"
                            label="common:show_completed"
                            translateOptions={{ count: countCompleted }}
                        />
                    )}
                    <LoadStopsStyled.MoreOptionsButton onClick={onClickMoreOptions}>
                        <VectorIcons.ThreeDotsIcon color="primary" />
                    </LoadStopsStyled.MoreOptionsButton>
                </Stack>
            )}
        </Stack>
    );
}

export default React.memo(StopsHeader);
