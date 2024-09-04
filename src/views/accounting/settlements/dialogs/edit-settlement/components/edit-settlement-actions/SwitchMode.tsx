import { FormControlLabel, Switch, SwitchProps, styled } from '@mui/material';
import { SyntheticEvent } from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
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
            backgroundColor       : '#33cf4d !important',
            '& + .MuiSwitch-track': {
                opacity: 1,
                border : 0,

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
    '& .MuiFormControlLabel-label': {
        color        : '#667085',
        lineHeight   : '20px',
        fontWeight   : 600,
        fontSize     : '14px',
        textTransform: 'uppercase',
        marginLeft   : '8px'
    }
}));

export type ChangeType = (event: SyntheticEvent<Element, Event>, checked: boolean) => void;

type Props = {
    label?: IntlMessageKey;
    checked: boolean;
    onChange: ChangeType;
    disabled?: boolean;
};

export default function SwitchMode({
    label = '',
    checked,
    onChange,
    disabled
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Label
            control={<IOSSwitch checked={checked} />}
            onChange={onChange}
            label={t(label)}
            disabled={disabled}
        />
    );
}
