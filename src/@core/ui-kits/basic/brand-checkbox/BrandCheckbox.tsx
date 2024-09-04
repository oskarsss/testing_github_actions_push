import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { FormControlLabel, SxProps, Theme } from '@mui/material';
import type { ReactElement } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';

type Props = {
    checked: boolean;
    disabled?: boolean;
    setCheck: (value: boolean) => void;
    label: IntlMessageKey | ReactElement | string;
    translateOptions?: IntlOptions;
    variant?: 'fullWidth' | 'default';
    size?: 'small' | 'medium';
    sx?: SxProps<Theme>;
};

export default function BrandCheckbox({
    checked,
    disabled = false,
    setCheck,
    label,
    variant,
    size = 'medium',
    translateOptions,
    sx = {}
}: Props) {
    const { t } = useAppTranslation();

    return (
        <FormControlLabel
            sx={{
                display: 'flex',
                margin : 0,

                width          : variant === 'default' ? 'fit-content' : '100% !important',
                backgroundColor: ({ palette }) =>
                    checked ? palette.semantic.foreground.brand.secondary : 'none',
                padding     : '2px 4px',
                borderRadius: '4px',
                borderWidth : '1px',
                borderStyle : 'solid',
                borderColor : ({ palette }) =>
                    checked
                        ? `${palette.semantic.border.brand.tertiary} !important`
                        : 'transparent',
                minHeight: size === 'small' ? '20px' : '32px',
                maxHeight: size === 'small' ? '20px' : '32px',
                ...sx
            }}
            slotProps={{
                typography: {
                    color: ({ palette }) =>
                        checked
                            ? palette.semantic.foreground.brand.primary
                            : palette.semantic.text.secondary,
                    fontSize   : size === 'small' ? '12px' : '14px',
                    fontWeight : 500,
                    paddingLeft: '4px'
                }
            }}
            control={(
                <Checkbox
                    disabled={disabled}
                    onChange={(e, check) => setCheck(check)}
                    checked={checked}
                    size={size}
                />
            )}
            label={typeof label === 'string' ? t(label, translateOptions) : label}
        />
    );
}
