import { FormControlLabel, Switch as MUISwitch, SwitchProps, styled } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

export const IOSSwitch = styled((props: SwitchProps) => (
    <MUISwitch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width                    : 36,
    height                   : 20,
    padding                  : 0,
    '& .MuiSwitch-switchBase': {
        padding           : 0,
        margin            : 2,
        transitionDuration: '300ms',
        color             : '#fff !important',
        '&.Mui-checked'   : {
            transform             : 'translateX(16px)',
            color                 : '#fff',
            '& + .MuiSwitch-track': {
                opacity        : 1,
                border         : 0,
                backgroundColor: theme.palette.semantic.foreground.brand.primary
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color : '#33cf4d',
            border: '6px solid #fff'
        },

        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.colors.gray[100]
                    : theme.palette.colors.gray[600]
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width    : 16,
        height   : 16
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,

        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity        : 1,
        transition     : theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}));

const Label = styled(FormControlLabel)(() => ({
    marginLeft                    : 0,
    marginRight                   : 0,
    '& .MuiFormControlLabel-label': {
        color        : '#667085',
        lineHeight   : '20px',
        fontWeight   : 600,
        fontSize     : '14px',
        textTransform: 'uppercase',
        marginLeft   : '8px'
    }
}));

export type AeroSwitchChangeType = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
) => void;

type Props = {
    label: IntlMessageKey;
    isChecked: boolean;
    onChange: AeroSwitchChangeType;
};

export default function AeroSwitch({
    label,
    isChecked,
    onChange
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Label
            label={t(label)}
            control={<IOSSwitch />}
            checked={isChecked}
            onChange={onChange}
        />
    );
}
