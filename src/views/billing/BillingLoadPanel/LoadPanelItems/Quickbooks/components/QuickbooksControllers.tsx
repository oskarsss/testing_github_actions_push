import BillingLoadPanelComponents from '@/views/billing/BillingLoadPanel/BillingLoadPanelComponents';
import QuickbooksIcon from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/icons';
import AddIcon from '@mui/icons-material/Add';
import { Stack, Typography, Tooltip } from '@mui/material';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice } from '@proto/integration_provider_quickbooks';
import { useConfirm } from '@/@core/components/confirm-dialog';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';

type Props = {
    load_id: string;
    disabled?: boolean;
    quickbooksInvoiceItems?: IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice[];
};

export default function QuickbooksControllers({
    load_id,
    disabled,
    quickbooksInvoiceItems
}: Props) {
    const [createInvoice] = IntegrationQuickbooksGrpcService.useCreateInvoiceQuickbooksMutation();
    const [voidInvoice] = IntegrationQuickbooksGrpcService.useVoidInvoiceQuickbooksMutation();
    const [sendInvoice] = IntegrationQuickbooksGrpcService.useSendInvoiceQuickbooksMutation();
    const [deleteInvoice] = IntegrationQuickbooksGrpcService.useDeleteInvoiceQuickbooksMutation();
    const [syncInvoice] = IntegrationQuickbooksGrpcService.useSyncInvoiceQuickbooksMutation();

    const confirm = useConfirm();
    const { t } = useAppTranslation();
    const hasQBInvoiceItems = quickbooksInvoiceItems ? quickbooksInvoiceItems.length > 0 : false;

    const onSend = () => {
        confirm({
            title           : 'billing:panel.widget.quickbooks.button.send.confirm_dialog.title',
            body            : 'billing:panel.widget.quickbooks.button.send.confirm_dialog.body',
            max_width_dialog: '500px',
            onConfirm       : () => sendInvoice({ loadIds: [load_id] }),
            confirm_text    : 'common:button.send'
        });
    };

    const onVoid = () => {
        confirm({
            title           : 'billing:panel.widget.quickbooks.button.void.confirm_dialog.title',
            body            : 'billing:panel.widget.quickbooks.button.void.confirm_dialog.body',
            max_width_dialog: '500px',
            onConfirm       : () => voidInvoice({ loadIds: [load_id] }),
            confirm_text    : 'common:button.void'
        });
    };

    const onDelete = () => {
        confirm({
            title           : 'billing:panel.widget.quickbooks.button.delete.confirm_dialog.title',
            body            : 'billing:panel.widget.quickbooks.button.delete.confirm_dialog.body',
            max_width_dialog: '500px',
            onConfirm       : () => deleteInvoice({ loadIds: [load_id] }),
            confirm_text    : 'common:button.delete'
        });
    };

    const onCreate = () => {
        confirm({
            title           : 'billing:panel.widget.quickbooks.button.create.confirm_dialog.title',
            body            : 'billing:panel.widget.quickbooks.button.create.confirm_dialog.body',
            max_width_dialog: '500px',
            onConfirm       : () => createInvoice({ loadIds: [load_id] }),
            confirm_text    : 'common:button.create'
        });
    };

    const onSync = () => {
        confirm({
            title           : 'billing:panel.widget.quickbooks.button.sync.confirm_dialog.title',
            body            : 'billing:panel.widget.quickbooks.button.sync.confirm_dialog.body',
            max_width_dialog: '500px',
            onConfirm       : () => syncInvoice({ loadIds: [load_id] }),
            confirm_text    : 'common:button.sync'
        });
    };

    if (hasQBInvoiceItems) {
        return (
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="6px"
            >
                <BillingLoadPanelComponents.Card.Button
                    variant="outlined"
                    disabled={disabled}
                    sx={{ padding: '2px' }}
                    color="primary"
                    onClick={onSync}
                >
                    <VectorIcons.SyncIcon color="primary" />
                    {t('common:button.sync')}
                </BillingLoadPanelComponents.Card.Button>
                <Tooltip
                    disableInteractive
                    title={t('common:button.send')}
                >
                    <BillingLoadPanelComponents.Card.Button
                        variant="outlined"
                        disabled={disabled}
                        sx={{ padding: '2px' }}
                        color="primary"
                        onClick={onSend}
                    >
                        <QuickbooksIcon.SendIcon
                            sx={{
                                width : '16px',
                                height: '16px',
                                color : ({ palette }) => palette.semantic.foreground.brand.primary
                            }}
                        />
                    </BillingLoadPanelComponents.Card.Button>
                </Tooltip>

                <Tooltip
                    disableInteractive
                    title={t('common:button.void')}
                >
                    <BillingLoadPanelComponents.Card.Button
                        variant="outlined"
                        disabled={disabled}
                        sx={{ padding: '2px' }}
                        color="secondary"
                        onClick={onVoid}
                    >
                        <CancelRoundedIcon
                            sx={{
                                width : '16px',
                                height: '16px',
                                color : ({ palette }) => palette.semantic.foreground.primary
                            }}
                        />
                    </BillingLoadPanelComponents.Card.Button>
                </Tooltip>
                <Tooltip
                    disableInteractive
                    title={t('common:button.delete')}
                >
                    <BillingLoadPanelComponents.Card.Button
                        variant="outlined"
                        disabled={disabled}
                        sx={{ padding: '2px' }}
                        color="secondary"
                        onClick={onDelete}
                    >
                        <QuickbooksIcon.GarbageIcon
                            sx={{
                                width : '16px',
                                height: '16px',
                                color : ({ palette }) => palette.semantic.foreground.primary
                            }}
                        />
                    </BillingLoadPanelComponents.Card.Button>
                </Tooltip>
            </Stack>
        );
    }

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="6px"
        >
            <BillingLoadPanelComponents.Card.Button
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={onCreate}
            >
                <AddIcon />

                <Typography
                    fontSize="12px"
                    lineHeight="16px"
                    color="inherit"
                >
                    {t('common:button.create')}
                </Typography>
            </BillingLoadPanelComponents.Card.Button>
        </Stack>
    );
}
