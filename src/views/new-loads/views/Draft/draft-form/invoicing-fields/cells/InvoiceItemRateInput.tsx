import { memo, useMemo } from 'react';
import { LoadDraftFields_InvoiceItem } from '@proto/load_drafts';
import CurrencyFormat from '@/views/new-loads/views/Draft/draft-form/components/InputFormat/CurrencyFormat';
import { TestIDs } from '@/configs/tests';
import TableInput from '@/views/new-loads/views/Draft/draft-form/components/EditableTable/Input';
import { useDraftFormContext } from '@/views/new-loads/views/Draft/Draft';
import { useWatch } from 'react-hook-form';

type Props = {
    invoiceItemId: LoadDraftFields_InvoiceItem['invoiceItemId'];
};

function InvoiceItemRateInput({ invoiceItemId }: Props) {
    const { control } = useDraftFormContext();
    const invoiceItems = useWatch({ name: 'invoiceItems', control });

    const invoiceItemIndex = useMemo(
        () => invoiceItems.findIndex((element) => element.invoiceItemId === invoiceItemId),
        [invoiceItems, invoiceItemId]
    );

    return (
        <TableInput
            control={control}
            name={`invoiceItems.${invoiceItemIndex}.amountPerUnit`}
            inputProps={{ inputComponent: CurrencyFormat }}
            placeholder="new_loads:draft.form.fields.rate.placeholder"
            testID={TestIDs.pages.createLoad.fields.invoicingRate}
        />
    );
}

export default memo(InvoiceItemRateInput);
