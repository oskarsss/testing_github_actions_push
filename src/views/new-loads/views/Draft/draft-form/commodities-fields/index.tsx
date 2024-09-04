import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import { StepContainer, StepTitle } from '../../styled';
import Table from './Table';
import AddItemButton from './AddItemButton';

export default function Commodities() {
    const { t } = useAppTranslation();

    return (
        <StepContainer>
            <StepTitle>
                <VectorIcons.FullDialogIcons.Commodity />
                {t('new_loads:draft.form.steps.5')}
                {/* <AddItemButton /> */}
            </StepTitle>
            <Table />
        </StepContainer>
    );
}
