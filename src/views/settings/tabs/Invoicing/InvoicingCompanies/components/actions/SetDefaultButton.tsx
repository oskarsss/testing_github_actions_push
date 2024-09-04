import Button from '@mui/material/Button';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';

type Props = {
    invoicingCompanyId: string;
    disabled?: boolean;
};

export default function SetDefaultButton({
    invoicingCompanyId,
    disabled
}: Props) {
    const { t } = useAppTranslation();
    const [setDefault, { isLoading }] =
        InvoicingCompanyGrpcService.useSetDefaultInvoicingCompanyMutation();

    const handleDeleteOrRestore = () => {
        if (disabled) return;
        setDefault({ invoicingCompanyId });
    };

    return (
        <Button
            variant="contained"
            onClick={handleDeleteOrRestore}
            disabled={isLoading || disabled}
        >
            {t('common:button.set_default')}
        </Button>
    );
}
