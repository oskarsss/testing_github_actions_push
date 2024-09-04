import VectorIcons from '@/@core/icons/vector_icons';
import Button from '@mui/material/Button';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';

type Props = {
    invoicingCompanyId: string;
};

export default function DeleteButton({ invoicingCompanyId }: Props) {
    const { t } = useAppTranslation();
    const [deleteCompany, { isLoading }] =
        InvoicingCompanyGrpcService.useDeleteInvoicingCompanyMutation();

    const handleDeleteOrRestore = () => {
        deleteCompany({ invoicingCompanyId });
    };

    return (
        <Button
            variant="outlined"
            onClick={handleDeleteOrRestore}
            color="error"
            disabled={isLoading}
            startIcon={<VectorIcons.TrashIcon />}
        >
            {t('common:button.delete')}
        </Button>
    );
}
