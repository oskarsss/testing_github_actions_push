import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Menu, Stack } from '@mui/material';
import OptionsItem from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/components/OptionsItem';
import React from 'react';
import { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import {
    CompactedDayLinesIcon,
    WIdeDayLinesIcon
} from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/icons';

const DayLinesOptions: DayLinesType[] = ['compacted', 'wide'];
const DayLinesComponentIcons: Record<DayLinesType, typeof CompactedDayLinesIcon> = {
    compacted: CompactedDayLinesIcon,
    wide     : WIdeDayLinesIcon
};

type Props = {
    setDaysLinesType: (type: DayLinesType) => void;
    anchorEl: HTMLElement | null;
    onClose: () => void;
};

function DayLinesTypesMenu({
    anchorEl,
    onClose,
    setDaysLinesType
}: Props) {
    const { t } = useAppTranslation('modals');
    return (
        <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={onClose}
            sx={{
                mt                : '2px',
                '& .MuiPaper-root': {
                    borderRadius   : '8px',
                    width          : '140px',
                    border         : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                    backgroundColor: (theme) => theme.palette.semantic.foreground.white.primary,
                    boxShadow      : 'none'
                },
                '& .MuiList-root': {
                    padding: 0,
                    width  : '140px'
                }
            }}
        >
            <Stack>
                {DayLinesOptions.map((type) => (
                    <OptionsItem
                        key={type}
                        text={t(`loads.settings.days_lines.types.${type}`)}
                        Icon={DayLinesComponentIcons[type]}
                        size="small"
                        onClick={() => setDaysLinesType(type)}
                    />
                ))}
            </Stack>
        </Menu>
    );
}

export default DayLinesTypesMenu;
