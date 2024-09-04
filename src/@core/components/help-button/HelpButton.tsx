import React from 'react';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

// TODO: fix the URLS use @SYSTEM
const URLS = {
    how_to_add_a_load:
        'https://help.vektortms.com/en/articles/8183895-how-to-add-a-load#h_f7df961a14'
};

const Button = styled(MuiButton)(({ theme }) => ({
    position  : 'relative',
    zIndex    : 1,
    overflow  : 'hidden',
    '&:before': {
        content     : '""',
        position    : 'absolute',
        zIndex      : 2,
        top         : '-160%',
        left        : '50%',
        width       : '238px',
        height      : '238px',
        borderRadius: '100%',
        background  : theme.palette.colors.brand[400]
    },
    span: {
        position: 'relative',
        zIndex  : 3
    }
}));

type Variant = 'text' | 'outlined' | 'contained';
type Size = 'small' | 'medium' | 'large';
type Color = 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

type Props = {
    name: IntlMessageKey;
    icon: React.ReactNode;
    url_key: keyof typeof URLS;
    style?: React.CSSProperties;
    variant?: Variant;
    size?: Size;
    color?: Color;
    disabled?: boolean;
    testId?: string;
};

export default function HelpButton({
    name,
    icon,
    url_key,
    style,
    variant = 'contained',
    size = 'medium',
    color = 'primary',
    disabled = false,
    testId
}: Props) {
    const { t } = useAppTranslation();
    const openInNewTab = () => {
        const newWindow = window.open(URLS[url_key], '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    return (
        <Button
            variant={variant}
            size={size}
            color={color}
            endIcon={icon}
            disabled={disabled}
            onClick={openInNewTab}
            style={style}
            {...applyTestId(testId)}
        >
            <span>{t(name)}</span>
        </Button>
    );
}
