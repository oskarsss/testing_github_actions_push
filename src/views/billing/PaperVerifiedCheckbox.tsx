import { useConfirm } from '@/@core/components/confirm-dialog';
import { api } from '@/store/api';
import { ProvideTagsType } from '@/store/api_tags';
import { Checkbox } from '@mui/material';
import React from 'react';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useAppDispatch } from '@/store/hooks';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';

type Props = {
    invoice_paperwork_verified: boolean;
    invalidateTags: ProvideTagsType[];
    load_id: string;
};

export const renderCheckboxStyles = (mode: string, value: number) => {
    if (value === 0) {
        return {
            backgroundColor: mode === 'light' ? '#ffdde0' : '#441a2a',
            fontWeight     : 600,
            color          : mode === 'light' ? '#a51313' : '#fff',
            borderTop      : '2px solid #ff9393'
        };
    }

    return {};
};

export default function PaperVerifiedCheckbox({
    invoice_paperwork_verified,
    invalidateTags,
    load_id
}: Props) {
    const [update] = LoadsGrpcService.useUpdateInvoicePaperworkVerifiedMutation();
    const dispatch = useAppDispatch();
    const confirm = useConfirm();

    const updateHandler = (checked: boolean) => {
        update({
            invoicePaperworkVerified: checked,
            loadId                  : load_id
        })
            .unwrap()
            .then(() => {
                dispatch(api.util.invalidateTags(invalidateTags));
            });
    };

    const onChangeCheckbox = (checked: boolean) => {
        if (!invoice_paperwork_verified) {
            confirm({
                icon        : <DangerousIcon color="secondary" />,
                title       : 'billing:cell.paper_verified.confirm.title',
                body        : 'billing:cell.paper_verified.confirm.body',
                confirm_text: 'common:button.confirm',
                onConfirm   : () => updateHandler(checked)
            });
        } else {
            updateHandler(checked);
        }
    };

    return (
        <Checkbox
            onChange={(_, checked) => onChangeCheckbox(checked)}
            checked={invoice_paperwork_verified}
        />
    );
}
