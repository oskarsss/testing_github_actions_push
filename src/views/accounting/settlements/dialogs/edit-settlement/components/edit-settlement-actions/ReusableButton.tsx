import { memo, ReactNode } from 'react';
import { LoadingButton } from '@mui/lab';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    onClick: () => void;
    isDisabled: boolean;
    isLoading: boolean;
    label: IntlMessageKey;
    tooltip: IntlMessageKey;
    Icon: ReactNode;
    variant?: 'contained' | 'outlined';
};

function ReusableButton({
    onClick,
    isDisabled,
    isLoading,
    label,
    tooltip,
    Icon,
    variant = 'contained'
}: Props) {
    const { t } = useAppTranslation();
    const { breakpoints } = useTheme();
    const isXl = useMediaQuery(breakpoints.up('xl'));

    return (
        <Tooltip
            title={!isXl && !isDisabled ? t(label) : t(tooltip)}
            disableHoverListener={!isXl && !isDisabled ? false : !isDisabled}
        >
            <span style={{ height: '100%' }}>
                <LoadingButton
                    variant={variant}
                    loading={isLoading}
                    disabled={isDisabled}
                    onClick={onClick}
                    startIcon={Icon}
                    sx={{
                        height: '100%',
                        ...(!isXl && {
                            '& .MuiButton-startIcon': {
                                margin: 0
                            }
                        })
                    }}
                    aria-label="Reusable Button"
                >
                    {isXl && t(label)}
                </LoadingButton>
            </span>
        </Tooltip>
    );
}

export default memo(ReusableButton);
