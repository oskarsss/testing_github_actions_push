import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import { Typography } from '@mui/material';
import React from 'react';
import BrandCheckbox from '@/@core/ui-kits/basic/brand-checkbox/BrandCheckbox';
import LoadStopsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-stops-tab/LoadStops.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    showOtherStops: boolean;
    showCompletedStops: boolean;
    setShowOtherStops: (value: boolean) => void;
    setShowCompletedStops: (value: boolean) => void;
    countCompleted: number;
    countOther: number;
};

function TrackingLoadStopsHeader({
    showOtherStops,
    showCompletedStops,
    setShowOtherStops,
    setShowCompletedStops,
    countCompleted,
    countOther
}: Props) {
    const { t } = useAppTranslation();

    const showOtherStopsHandler = (value: boolean) => setShowOtherStops(value);

    const showCompletedStopsHandler = (value: boolean) => setShowCompletedStops(value);

    return (
        <StopsComponents.StopItemRow>
            <Typography
                color={(theme) => theme.palette.semantic.text.primary}
                fontSize="16px"
                fontWeight={600}
                lineHeight={1.4}
            >
                {t('entity:stops')}
            </Typography>
            <LoadStopsStyled.RowWrapper sx={{ gap: '4px' }}>
                {countOther > 0 && (
                    <BrandCheckbox
                        checked={showOtherStops}
                        variant="default"
                        setCheck={showOtherStopsHandler}
                        size="small"
                        label="tracking:panel.checkboxes.other_stops"
                        translateOptions={{ count: countOther }}
                    />
                )}
                {countCompleted > 0 && (
                    <BrandCheckbox
                        checked={showCompletedStops}
                        variant="default"
                        setCheck={showCompletedStopsHandler}
                        size="small"
                        label="tracking:panel.checkboxes.completed"
                        translateOptions={{ count: countCompleted }}
                    />
                )}
            </LoadStopsStyled.RowWrapper>
        </StopsComponents.StopItemRow>
    );
}

export default React.memo(TrackingLoadStopsHeader);
