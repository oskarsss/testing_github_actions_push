import React from 'react';

import Scheduling from '@/store/dispatch/scheduling/types';
import getFontSize from '@/views/dispatch/scheduling/components/Table/components/loads/utils/getFontSize';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Container } from './styled';

type Props = {
    leftNoCovered: React.RefObject<number>;
    totalWidthRowOfWeek: number;
    covered: Scheduling.TruckManifestRow['covered'];
    timeUncovered: Scheduling.TruckManifestRow['timeUncovered'];
};

const NoCovered = ({
    leftNoCovered,
    totalWidthRowOfWeek,
    covered,
    timeUncovered
}: Props) => {
    const { t } = useAppTranslation('schedule');
    if (covered) return null;

    const left = Number(leftNoCovered.current);

    const fontSize = getFontSize(
        totalWidthRowOfWeek - left,
        10,
        timeUncovered?.length || 10,
        14,
        32
    );

    return (
        <Container
            style={{
                left,
                width: totalWidthRowOfWeek - left,
                fontSize
            }}
        >
            <span>{t('table.no_covered')}</span>
            <span style={{ fontSize: '60%' }}>{timeUncovered}</span>
        </Container>
    );
};

export default NoCovered;
