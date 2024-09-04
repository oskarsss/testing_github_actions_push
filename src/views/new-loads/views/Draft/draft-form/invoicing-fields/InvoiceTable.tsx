/* eslint-disable no-case-declarations */
import { useWatch } from 'react-hook-form';
import { TestIDs } from '@/configs/tests';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { LoadDraftFields_InvoiceItem } from '@proto/load_drafts';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import NoItems from '../components/NoItems';
import { useDraftFormContext } from '../../Draft';
import columns from './columns';

function InvoiceTable() {
    const { t } = useAppTranslation();
    const {
        control,
        getValues,
        setValue
    } = useDraftFormContext();

    const invoiceItems = useWatch({ name: 'invoiceItems', control });
    const executeAction: MiniTableExecuteActionType<LoadDraftFields_InvoiceItem> = (
        name,
        props
    ) => {
        switch (name) {
        case 'delete':
            const { invoiceItems } = getValues();
            const updatedItems = invoiceItems.filter(
                (item) => item.invoiceItemId !== props.row.invoiceItemId
            );
            setValue('invoiceItems', updatedItems);
            break;
        default:
            break;
        }
    };

    if (!invoiceItems.length) return <NoItems title={t('new_loads:draft.form.invoicing.no_items')} />;

    const total = invoiceItems.reduce(
        (acc, item) => +(acc + Number(item.units) * Number(item.amountPerUnit)).toFixed(2),
        0
    );

    return (
        <div
            style={{
                width    : '100%',
                position : 'relative',
                marginTop: '24px'
            }}
        >
            <MiniTable
                columns={columns}
                turnOffBorder
                rows={invoiceItems}
                elementKey="invoiceItemId"
                executeAction={executeAction}
                emptyStateContent={<NoItems title={t('new_loads:draft.form.invoicing.no_items')} />}
                ComponentAfterContent={(
                    <TotalsRow
                        without_border
                        columns={columns}
                        fontSize="large"
                        info_config={{
                            total_amount: `$${total}`
                        }}
                        testID={TestIDs.pages.createLoad.fields.totalSumInvoicing}
                    />
                )}
            />
        </div>
    );
}

export default InvoiceTable;
