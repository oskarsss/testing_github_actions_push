import * as React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Step4Icon from '../../../../icons/Step4Icon';
import InvoiceTable from './InvoiceTable';

import { StepContainer, StepTitle } from '../../styled';
import AddItemButton from './AddItemButton';

function InvoicingFields() {
    const { t } = useAppTranslation();
    return (
        <StepContainer>
            <StepTitle>
                <Step4Icon />
                {t('new_loads:draft.form.steps.4')}
                <AddItemButton />
            </StepTitle>
            <InvoiceTable />
        </StepContainer>
    );
}

export default InvoicingFields;
