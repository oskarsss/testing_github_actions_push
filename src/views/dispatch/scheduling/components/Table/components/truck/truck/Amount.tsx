import React from 'react';
import Scheduling from '@/store/dispatch/scheduling/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Container, Amount, AmountForMile } from './styled';

type Props = {
    truck: Scheduling.TruckManifestRow;
};
const TruckAmount = ({ truck }: Props) => {
    const { t } = useAppTranslation();
    if (!truck.totalGrossAmount && !truck.avgRpm) return null;
    return (
        <Container>
            <Amount>{truck.totalGrossAmount}</Amount>
            <AmountForMile>
                {truck.avgRpm ? `${truck.avgRpm}/${t('common:mile')}` : ''}
            </AmountForMile>
        </Container>
    );
};

export default TruckAmount;
