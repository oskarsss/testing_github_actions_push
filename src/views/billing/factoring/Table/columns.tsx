import TableTypes from '@/@core/components/table/types';
import { checkbox_style } from '@/@core/components/table/table_config';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import getBillingCustomColumns from '@/views/billing/common-custom-column-config';
import { CheckboxStyleCell } from '@/views/billing/styled';
import SelectDeselectItemsCheckbox from '@/@core/components/table/custom-cells/SelectDeselectTableItemsCheckbox';
import { ConvertedGrpcInvoiceType } from '@/store/billing/hooks';
import { LoadModel_InvoiceStatus } from '@proto/models/model_load';
import { replaceFromString } from '@/@core/components/notes/components/AllNotes/utils';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import NotesCell from '../../NotesCell';
import PaperVerifiedCheckbox, { renderCheckboxStyles } from '../../PaperVerifiedCheckbox';

// selfie, name, id, tlc_license, balance,       phone, license, state, status, signed_up_on
const columns: TableTypes.FixedCustomColumns<ConvertedGrpcInvoiceType> = {
    multi_select_checkbox: {
        width     : 50,
        style     : CheckboxStyleCell,
        renderCell: (row) => (
            <SelectDeselectItemsCheckbox
                id={row.loadId}
                tableName="factoringInvoices"
            />
        )
    },
    load_id: {
        width: 100,
        style: {
            fontWeight    : 500,
            boxSizing     : 'border-box',
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'left'
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                element_id: event.currentTarget
            }),
        renderCell: (row) => row.friendlyId
    },
    status: {
        width     : 100,
        style     : StatusChipCellStyle,
        renderCell: (row) => (
            <LoadStatusChipSelect
                load_id={row.loadId}
                load_status={LOAD_STATUS_GRPC_ENUM[row.status]}
                show_arrow={false}
                invalidateTags={['billing.factoring', 'billing.factoring.stats']}
                full_width
            />
        )
    },
    invoice_status: {
        width     : 140,
        style     : StatusChipCellStyle,
        renderCell: (row) => (
            <LoadInvoiceStatusChipSelect
                invalidateTags={['billing.factoring', 'billing.factoring.stats']}
                invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[row.invoiceStatus]}
                load_id={row.loadId}
                show_arrow={false}
                full_width
            />
        )
    },
    invoice_paperwork_verified: {
        width   : 150,
        sortable: false,
        getCellStyle(row, { theme }) {
            return {
                ...checkbox_style,
                ...renderCheckboxStyles(
                    theme?.palette.mode as string,
                    row.invoicePaperworkVerified ? 1 : 0
                )
            };
        },
        renderCell: (row) => (
            <PaperVerifiedCheckbox
                invalidateTags={[
                    'billing.factoring.stats',
                    'billing.factoring',
                    'integration.apexcapital.preview'
                ]}
                invoice_paperwork_verified={row.invoicePaperworkVerified}
                load_id={row.loadId}
            />
        )
    },
    days_since_completed: {
        width: 600,
        style: {
            overflow      : 'hidden',
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'center'
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                element_id: event.currentTarget
            }),
        getCellStyle: (row) => {
            if (
                row.invoiceStatus !== LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_PAID &&
                row.daysSinceCompleted > 8
            ) {
                return {
                    backgroundColor: '#ffdde0',
                    fontWeight     : 600,
                    color          : '#a51313'
                };
            }
            return {};
        },
        renderCell: (row, { t }) =>
            t('billing:cell.days_since_completed', { days: row.daysSinceCompleted })
    },
    invoice_factoring_note: {
        width: 600,
        style: {
            overflow: 'hidden'
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                element_id: event.currentTarget
            }),
        renderCell: (row) => replaceFromString(row.invoiceFactoringNote)
    },
    invoice_billing_notes: {
        width   : 800,
        sortable: true,
        style   : {
            cursor  : 'pointer',
            overflow: 'hidden',
            padding : 0
        },
        renderCell: (row, { rowHeight }) => (
            <NotesCell
                rowHeight={rowHeight}
                load_id={row.loadId}
                notes={row.invoiceBillingNotes}
                manifests={row.manifests}
            />
        )
    },
    ...getBillingCustomColumns
};

export default columns;
