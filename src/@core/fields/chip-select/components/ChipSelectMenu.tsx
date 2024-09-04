import React from 'react';
import MenuList from '@mui/material/MenuList';
import { MenuItem } from '@mui/material';
import { ENTITY_CHIP_COLORS, ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import ListItemText from '@mui/material/ListItemText';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { IChipColors } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ChipSelectWrapIcon } from '@/@core/fields/chip-select/components/styled';
import { applyTestId } from '@/configs/tests';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import { IntlMessage, IntlMessageKey } from '@/@types/next-intl';

type Props<StatusType extends string | number> = {
    status: StatusType;
    onChange: ChipSelectTypes.OnChange<StatusType>;
    status_prefix: IntlMessage;
    custom_icons?: Record<StatusType, React.ReactNode>;
    custom_colors?: Record<StatusType, IChipColors>;
    custom_colors_without_theme?: Record<StatusType, ChipSelectTypes.CustomColors>;
    options: StatusType[];
    optionTestId?: string;
    ignoreWaitingResponse?: boolean;
};
export const useChipSelectMenu = menuHookFabric(ChipSelectMenu, {
    keepMounted: false
});

function ChipSelectMenu<StatusType extends string | number>({
    status,
    onChange,
    custom_icons,
    status_prefix,
    custom_colors,
    custom_colors_without_theme,
    options,
    optionTestId,
    ignoreWaitingResponse = false
}: Props<StatusType>) {
    const chipSelectMenu = useChipSelectMenu(true);
    const { t } = useAppTranslation();

    const onClick: ChipSelectTypes.OnChange<StatusType> = async (selected_status) => {
        if (status === selected_status) {
            chipSelectMenu.close();
            return;
        }
        onChange(selected_status)?.then(() => {
            if (!ignoreWaitingResponse) {
                chipSelectMenu.close();
            }
        });
        if (ignoreWaitingResponse) {
            chipSelectMenu.close();
        }
    };

    return (
        <MenuList disablePadding>
            {options.map((option) => (
                <MenuItem
                    {...applyTestId(optionTestId)}
                    key={option}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        onClick(option);
                    }}
                    selected={status === option}
                >
                    <ChipSelectWrapIcon
                        custom_colors_without_theme={custom_colors_without_theme?.[status]}
                        color_icon={(custom_colors || ENTITY_CHIP_COLORS)[option]}
                    >
                        {(custom_icons || ENTITY_CHIP_ICONS)[option]}
                    </ChipSelectWrapIcon>

                    <ListItemText>{t(`${status_prefix}.${option}` as IntlMessageKey)}</ListItemText>
                </MenuItem>
            ))}
        </MenuList>
    );
}
