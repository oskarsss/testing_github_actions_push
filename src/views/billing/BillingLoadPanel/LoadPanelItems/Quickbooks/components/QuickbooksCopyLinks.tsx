import { IconButton, Tooltip } from '@mui/material';
import QuickbooksIcon from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/icons';
import React from 'react';
import { IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice } from '@proto/integration_provider_quickbooks';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    invoices?: IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice[];
};

export default function QuickbooksCopyLinks({ invoices }: Props) {
    const { t } = useAppTranslation();
    const copy = useCopyToClipboard();
    const links = invoices
        ?.filter((i) => i.invoiceLink)
        .map((item) => item.invoiceLink)
        .join('\n');

    if (!links) return null;

    const onCopy = () => {
        copy(links);
    };

    return (
        <Tooltip
            title={t('billing:panel.widget.quickbooks.button.copy_link.tooltip')}
            disableInteractive
        >
            <IconButton
                onClick={onCopy}
                sx={{
                    padding   : '3px',
                    marginLeft: '4px !important'
                }}
            >
                <QuickbooksIcon.CopyIcon
                    sx={{
                        fontSize: '14px',
                        color   : ({ palette }) => palette.semantic.foreground.primary
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}
