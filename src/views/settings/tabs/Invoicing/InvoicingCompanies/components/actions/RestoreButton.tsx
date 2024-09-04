import VectorIcons from '@/@core/icons/vector_icons';
import Button from '@mui/material/Button';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';

type Props = {
    invoicingCompanyId: string;
};

export default function RestoreButton({ invoicingCompanyId }: Props) {
    const { t } = useAppTranslation();
    const [restore, { isLoading }] =
        InvoicingCompanyGrpcService.useRestoreInvoicingCompanyMutation();

    const handleDeleteOrRestore = () => {
        restore({ invoicingCompanyId });
    };

    return (
        <Button
            variant="outlined"
            onClick={handleDeleteOrRestore}
            color="primary"
            disabled={isLoading}
            startIcon={(
                <VectorIcons.RestoreIcon
                    sx={{
                        path: {
                            fill: (theme) => theme.palette.semantic.foreground.brand.primary
                        }
                    }}
                />
            )}
        >
            {t('common:button.restore')}
        </Button>
    );
}
