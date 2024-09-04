import { Button, Tooltip, useMediaQuery } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { memo } from 'react';

type Props = {
    showTotals: boolean;
    setShowTotals: (showTotals: boolean) => void;
};

function SwitchTotalsButton({
    showTotals,
    setShowTotals
}: Props) {
    const isShowTooltip = useMediaQuery('(max-width:1600px)');
    const { t } = useAppTranslation();

    return (
        <Tooltip
            title={t(`common:${showTotals ? 'hide_totals' : 'show_totals'}`)}
            disableHoverListener={!isShowTooltip}
            disableInteractive
        >
            <Button
                color="secondary"
                onClick={() => {
                    setShowTotals(!showTotals);
                }}
                size="small"
                aria-label="switch_totals_button"
            >
                {isShowTooltip ? (
                    <span>&sum;</span>
                ) : (
                    <span> {t(`common:${showTotals ? 'hide_totals' : 'show_totals'}`)} </span>
                )}
            </Button>
        </Tooltip>
    );
}

export default memo(SwitchTotalsButton);
