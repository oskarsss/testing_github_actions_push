import React, { ReactElement } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { applyTestId } from '@/configs/tests';
import { SxProps, Theme } from '@mui/material';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Size = 'small' | 'medium' | 'large';
type Color =
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';

type Props = {
    tooltip: IntlMessageKey | ReactElement;
    translateOptions?: IntlOptions;
    size?: Size;
    color?: Color;
    disabled?: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: React.ReactNode;
    padding?: string;
    sx?: SxProps<Theme>;
    testID?: string;
    className?: string;
};
export default function IconButtonWithTooltip({
    tooltip,
    translateOptions,
    size = 'medium',
    color = 'default',
    disabled = false,
    onClick,
    icon,
    padding,
    sx = {},
    testID,
    className
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Tooltip title={typeof tooltip === 'string' ? t(tooltip, translateOptions) : tooltip}>
            <span style={{ display: 'flex' }}>
                <IconButton
                    {...applyTestId(testID)}
                    size={size}
                    color={color}
                    disabled={disabled}
                    onClick={onClick}
                    sx={{ padding, ...sx }}
                    className={className}
                >
                    {icon}
                </IconButton>
            </span>
        </Tooltip>
    );
}
