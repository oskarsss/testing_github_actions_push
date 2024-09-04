import { TestIDs, applyTestId } from '@/configs/tests';
import { useWatch } from 'react-hook-form';
import { LoadDraftFields_InvoiceItem } from '@proto/load_drafts';
import { memo } from 'react';
import { useDraftFormContext } from '@/views/new-loads/views/Draft/Draft';

type Props = {
    invoiceItemId: LoadDraftFields_InvoiceItem['invoiceItemId'];
};

function TotalCell({ invoiceItemId }: Props) {
    const { control } = useDraftFormContext();
    const invoiceItem = useWatch({ name: 'invoiceItems', control }).find(
        (item) => item.invoiceItemId === invoiceItemId
    );

    const unit = invoiceItem?.units || 0;
    const rate = invoiceItem?.amountPerUnit || 0;
    const total = (Number(unit) * Number(rate)).toFixed(2);

    return (
        <span
            aria-live="polite"
            {...applyTestId(TestIDs.pages.createLoad.fields.invoicingTotal)}
        >
            {`$${+total}`}
        </span>
    );
}

export default memo(TotalCell);
