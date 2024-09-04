/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React, { CSSProperties, MouseEvent } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ChipSelectButton, Container, Wrapper } from '@/@core/fields/chip-select/components/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ENTITY_CHIP_COLORS, ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import { IChipColors } from '@/@core/theme/chip';
import { applyTestId } from '@/configs/tests';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import { useChipSelectMenu } from '@/@core/fields/chip-select/components/ChipSelectMenu';
import { IntlMessage, IntlMessageKey } from '@/@types/next-intl';
import { SxProps, Theme } from '@mui/material';

type Props<StatusType extends string | number> = {
    status: StatusType;
    onChange: ChipSelectTypes.OnChange<StatusType>;
    is_changing?: boolean;
    show_arrow?: boolean;
    show_icon?: boolean;
    full_width?: boolean;
    custom_icons?: Record<StatusType, React.ReactNode>;
    custom_colors?: Record<StatusType, IChipColors>;
    custom_colors_without_theme?: Record<StatusType, ChipSelectTypes.CustomColors>;
    status_prefix: IntlMessage;
    tooltip?: IntlMessageKey;
    options: StatusType[];
    sx?: SxProps<Theme>;
    styles?: CSSProperties;
    buttonTestId?: string;
    optionTestId?: string;
    size?: 'small' | 'medium';
    disabled?: boolean;
    stylesText?: CSSProperties;
    ignoreWaitingResponse?: boolean;
};

export default function ChipSelect<StatusType extends string | number>({
    status,
    onChange,
    is_changing = true,
    full_width = false,
    show_arrow = true,
    show_icon = true,
    custom_icons,
    custom_colors,
    custom_colors_without_theme,
    status_prefix,
    tooltip = 'fields:chip_select.tooltip',
    options = [],
    styles = {},
    sx = {},
    buttonTestId,
    optionTestId,
    size = 'medium',
    disabled = false,
    stylesText,
    ignoreWaitingResponse = false
}: Props<StatusType>) {
    const { t } = useAppTranslation();
    const chipSelectMenu = useChipSelectMenu();

    const onClick = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        if (!is_changing || disabled) return;
        chipSelectMenu.open({
            onChange: onChange as ChipSelectTypes.OnChange<string | number | StatusType>,
            options,
            status,
            status_prefix,
            custom_colors,
            custom_colors_without_theme,
            custom_icons,
            optionTestId,
            ignoreWaitingResponse
        })(event as MouseEvent<HTMLButtonElement>);
    };

    return (
        <Tooltip
            disableInteractive
            title={is_changing ? t(tooltip) : ''}
        >
            <Wrapper
                onClick={onClick}
                onContextMenu={onClick}
                fullWidth={full_width}
            >
                <ChipSelectButton
                    {...applyTestId(buttonTestId)}
                    sx={sx}
                    style={styles}
                    size={size}
                    color_btn={(custom_colors || ENTITY_CHIP_COLORS)[status]}
                    custom_colors_without_theme={custom_colors_without_theme?.[status]}
                    onClick={onClick}
                    onContextMenu={onClick}
                >
                    <Container>
                        {show_icon && (custom_icons || ENTITY_CHIP_ICONS)[status]}
                        <span style={stylesText}>
                            {t(`${status_prefix}.${status}` as IntlMessageKey)}
                        </span>
                    </Container>
                    {is_changing && show_arrow && <KeyboardArrowDownIcon />}
                </ChipSelectButton>
            </Wrapper>
        </Tooltip>
    );
}
