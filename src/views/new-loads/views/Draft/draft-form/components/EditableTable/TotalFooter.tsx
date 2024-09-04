import React from 'react';
import { TableCell, TableFooter, TableRow } from '@mui/material';
import {
    FooterCell,
    TotalAmount,
    TotalContainer,
    TotalTitle
} from '@/views/new-loads/views/Draft/draft-form/Truck/styled';
import { formatAmount } from '@/utils/formatting';
import { applyTestId } from '@/configs/tests';
import { Control, useWatch } from 'react-hook-form';
import { LoadDraftFields } from '@proto/load_drafts';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    testID?: string;
    control: Control<LoadDraftFields, any>;
};

function TotalFooter({
    testID = '',
    control
}: Props) {
    const { t } = useAppTranslation();
    const invoiceItems = useWatch({ name: 'invoiceItems', control });
    const total = invoiceItems.reduce(
        (acc, item) => acc + Number(item.units) * Number(item.amountPerUnit),
        0
    );
    return (
        <TableFooter>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan={3} />
                <FooterCell
                    colSpan={2}
                    sx={{ backgroundColor: (theme) => theme.palette.semantic.foreground.secondary }}
                >
                    <TotalContainer>
                        <TotalTitle>{t('common:total')}</TotalTitle>
                        <TotalAmount {...applyTestId(testID)}>{formatAmount(total)}</TotalAmount>
                    </TotalContainer>
                </FooterCell>
            </TableRow>
        </TableFooter>
    );
}

export default TotalFooter;
