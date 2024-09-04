import LoadStopsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-stops-tab/LoadStops.styled';
import BrandCheckbox from '@/@core/ui-kits/basic/brand-checkbox/BrandCheckbox';
import React from 'react';
import { Stack } from '@mui/material';
import LoadDocumentsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-documents/LoadDocuments.styled';
import VectorIcons from '@/@core/icons/vector_icons';
import LoadDetailsViewStyled from '@/views/dispatch/orders/Details/LoadDetailsView.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    showOtherStops: boolean;
    showCompletedStops: boolean;
    setShowOtherStops: (value: boolean) => void;
    setShowCompletedStops: (value: boolean) => void;
    countCompleted: number;
    countOther: number;
};

function LoadManifestsHeader({
    showOtherStops,
    showCompletedStops,
    setShowOtherStops,
    setShowCompletedStops,
    countCompleted,
    countOther
}: Props) {
    const { t } = useAppTranslation('entity');
    return (
        <LoadDocumentsStyled.HeaderContainer sx={{ paddingX: '16px' }}>
            <LoadDocumentsStyled.HeaderWrapper>
                <VectorIcons.StopIcon
                    color="primary"
                    sx={{ fontSize: '24px' }}
                />
                <LoadDetailsViewStyled.Title style={{ fontSize: '16px' }}>
                    {t('stops')}
                </LoadDetailsViewStyled.Title>
            </LoadDocumentsStyled.HeaderWrapper>

            <LoadDocumentsStyled.HeaderWrapper>
                {countOther > 0 && (
                    <BrandCheckbox
                        checked={showOtherStops}
                        variant="default"
                        setCheck={setShowOtherStops}
                        size="small"
                        label="loads:details.tabs.stops.checkboxes.show_other"
                        translateOptions={{ count: countOther }}
                    />
                )}

                {countCompleted > 0 && (
                    <BrandCheckbox
                        checked={showCompletedStops}
                        variant="default"
                        setCheck={setShowCompletedStops}
                        size="small"
                        label="loads:details.tabs.stops.checkboxes.show_completed"
                        translateOptions={{ count: countCompleted }}
                    />
                )}
            </LoadDocumentsStyled.HeaderWrapper>
        </LoadDocumentsStyled.HeaderContainer>
    );
}

export default React.memo(LoadManifestsHeader);
