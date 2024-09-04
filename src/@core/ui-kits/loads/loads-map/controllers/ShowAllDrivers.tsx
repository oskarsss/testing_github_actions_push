import Tooltip from '@mui/material/Tooltip';
import GroupsIcon from '@mui/icons-material/Groups';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadMapStyled from '../../../../../views/dispatch/orders/Details/sections/load-map/LoadMap.styled';

type Props = {
    onClick: () => void;
    showAllDrivers: boolean;
};

export default function ShowAllDrivers({
    onClick,
    showAllDrivers
}: Props) {
    const { t } = useAppTranslation('core');
    return (
        <Tooltip
            title={t(
                !showAllDrivers
                    ? 'basic.load.map.tooltips.show_other_drivers'
                    : 'basic.load.map.tooltips.hide_other_drivers'
            )}
        >
            <LoadMapStyled.ControllerSatellite onClick={onClick}>
                <GroupsIcon color={showAllDrivers ? 'primary' : 'action'} />
            </LoadMapStyled.ControllerSatellite>
        </Tooltip>
    );
}
