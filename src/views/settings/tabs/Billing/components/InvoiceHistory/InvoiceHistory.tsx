import TableBody from '@mui/material/TableBody';
import { columns } from '@/views/settings/tabs/Billing/components/InvoiceHistory/columns';
import Settings from '@/store/settings/types';
import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import SettingsEmptyScreen, { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';

type Props = {
    invoices?: Settings.InvoiceItem[];
};

export default function InvoiceHistory({ invoices }: Props) {
    const isInvoiceEmpty = !invoices || invoices.length === 0;
    return (
        <MiniTableStyled.Container
            sx={{
                height   : '100%',
                minHeight: '200px',
                position : 'relative'
            }}
        >
            <MiniTableStyled.CommonTable
                stickyHeader
                size="small"
                width="100%"
                aria-label="simple table"
            >
                <TableBody>
                    {!isInvoiceEmpty ? (
                        invoices.map((invoice) => (
                            <MiniTableStyled.Row
                                key={invoice.hostedInvoiceUrl}
                                without_border
                                hover
                                row_size="normal"
                            >
                                <MiniTableCells
                                    fontSize="medium"
                                    columns={columns}
                                    row={invoice}
                                    onClickCell={() => {}}
                                />
                            </MiniTableStyled.Row>
                        ))
                    ) : (
                        <MiniTableNoItems
                            colSpan={columns.length}
                            customNoItemContent={
                                <SettingsEmptyScreen type={FallbackType.INVOICE_HISTORY} />
                            }
                        />
                    )}
                </TableBody>
            </MiniTableStyled.CommonTable>
        </MiniTableStyled.Container>
    );
}
