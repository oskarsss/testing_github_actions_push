import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { MouseEvent, ReactNode } from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Button = styled(MuiButton)({
    height                : '40px',
    fontSize              : '16px',
    padding               : '6px 13px',
    '.MuiButton-startIcon': {
        fontSize: '20px'
    }
});

type Props = {
    title: IntlMessageKey;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    startIcon?: ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
};

export default function HeaderButton({
    title,
    onClick,
    startIcon,
    variant = 'outlined',
    disabled = false
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Button
            onClick={onClick}
            variant={variant}
            startIcon={startIcon}
            disabled={disabled}
        >
            {t(title)}
        </Button>
    );
}
