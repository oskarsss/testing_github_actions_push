import { Collapse, Stack } from '@mui/material';
import React from 'react';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import { IOSSwitch } from '@/@core/ui-kits/basic/aero-switch/AeroSwitch';
import VectorIcons from '@/@core/icons/vector_icons';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OptionsItem from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/components/OptionsItem';
import DayLinesTypesMenu from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/components/DayLinesTypesMenu';
import {
    CompactedDayLinesIcon,
    WIdeDayLinesIcon
} from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/icons';

export type DayLinesType = 'compacted' | 'wide';
export const loadSettingsMenuWidth = 320;
const DayLinesIcons: Record<DayLinesType, React.ReactNode> = {
    compacted: <CompactedDayLinesIcon />,
    wide     : <WIdeDayLinesIcon />
};

type Props = {
    daysLines: boolean;
    daysLinesType: DayLinesType;
    toggleDaysLines: () => void;
    setDaysLinesType: (type: DayLinesType) => void;
};

export const useLoadSettingsMenu = menuHookFabric(LoadSettingsMenu, {}, (props) => (
    <MenuComponents.MenuWrapper
        {...props}
        sx={{
            '& .MuiPaper-root': {
                borderRadius   : '8px',
                width          : loadSettingsMenuWidth,
                border         : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                backgroundColor: (theme) => theme.palette.semantic.foreground.white.primary,
                boxShadow      : 'none'
            }
        }}
    />
));

function LoadSettingsMenu({
    daysLines,
    toggleDaysLines,
    daysLinesType,
    setDaysLinesType
}: Props) {
    const { t } = useAppTranslation('modals');
    const [dayLinesState, setDayLinesState] = React.useState(daysLines);
    const [dayLinesTypeState, setDayLinesTypeState] = React.useState(daysLinesType);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const changeDaysLinesHandler = () => {
        toggleDaysLines();
        setDayLinesState((prev) => !prev);
    };

    const onOpenDaysLinesTypeMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleChangeDayLinesType = (type: DayLinesType) => {
        setAnchorEl(null);
        setDayLinesTypeState(type);
        setDaysLinesType(type);
    };

    return (
        <Stack paddingY="4px">
            <OptionsItem
                text={t(`loads.settings.days_lines.${dayLinesState ? 'hide' : 'show'}`)}
                Icon={VectorIcons.CheckListIcon}
            >
                <IOSSwitch
                    checked={dayLinesState}
                    onChange={changeDaysLinesHandler}
                />
            </OptionsItem>

            <Collapse in={dayLinesState}>
                <OptionsItem
                    text={t('loads.settings.days_lines.types.label')}
                    Icon={VectorIcons.CalendarAndLineIcon}
                >
                    <Badge
                        variant="outlined"
                        icon={DayLinesIcons[dayLinesTypeState]}
                        text={t(`loads.settings.days_lines.types.${dayLinesTypeState}`)}
                        sx={{ cursor: 'pointer', minWidth: '123px' }}
                        onClick={onOpenDaysLinesTypeMenu}
                    >
                        <KeyboardArrowDownIcon sx={{ ml: 'auto' }} />
                    </Badge>
                </OptionsItem>
            </Collapse>

            <DayLinesTypesMenu
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                setDaysLinesType={handleChangeDayLinesType}
            />
        </Stack>
    );
}
