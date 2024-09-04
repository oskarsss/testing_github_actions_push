import { memo, useMemo } from 'react';
import { TestIDs } from '@/configs/tests';
import { EditTableInput } from '@/views/new-loads/views/Draft/draft-form/components/EditableTable/Input';
import { LoadDraftFields_InvoiceItem } from '@proto/load_drafts';
import { useDraftFormContext } from '@/views/new-loads/views/Draft/Draft';
import { useWatch } from 'react-hook-form';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase';

type Props = {
    invoiceItemId: LoadDraftFields_InvoiceItem['invoiceItemId'];
};

function InvoiceItemUnitsInput({ invoiceItemId }: Props) {
    const { control } = useDraftFormContext();
    const invoiceItems = useWatch({ name: 'invoiceItems', control });

    const invoiceItemIndex = useMemo(
        () => invoiceItems.findIndex((element) => element.invoiceItemId === invoiceItemId),
        [invoiceItems, invoiceItemId]
    );

    return (
        <NumericInput
            variant="outlined"
            control={control}
            name={`invoiceItems.${invoiceItemIndex}.units`}
            label=""
            placeholder="new_loads:draft.form.fields.units.placeholder"
            decimalScale={0}
            allowNegative={false}
            step={1}
            testID={TestIDs.pages.createLoad.fields.invoicingUnits}
            customInput={EditTableInput as React.ComponentType<InputBaseComponentProps>}
        />
    );
}

export default memo(InvoiceItemUnitsInput);
