import { TextFieldFactoringCompany } from '@/@core/fields/select/FactoringCompanySelect';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Autocomplete } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditLoadInvoicingCompanyDialog } from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-invoicing-company-select/EditLoadInvoicingCompanyDialog';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';

type Props = {
    loadId: string;
    invoicingCompanyId: string;
};

export default function LoadInvoicingCompanyField({
    loadId,
    invoicingCompanyId
}: Props) {
    const { t } = useAppTranslation();
    const dialog = useEditLoadInvoicingCompanyDialog();
    const {
        data,
        isLoading
    } = InvoicingCompanyGrpcService.useGetInvoicingCompaniesQuery({});

    const invoicingCompany = data?.invoicingCompany.find(
        (company) => company.invoicingCompanyId === invoicingCompanyId
    );

    const value = {
        name: invoicingCompany ? invoicingCompany.name : t('common:none'),
        invoicingCompanyId
    };

    const onOpenDialog = () => {
        dialog.open({
            invoicingCompanyId,
            orderId: loadId
        });
    };

    return (
        <Autocomplete
            value={value}
            options={[]}
            readOnly
            disabled={isLoading}
            getOptionLabel={() => (isLoading ? `${t('common:loading')}...` : value.name)}
            sx={{ width: '200px' }}
            renderInput={(params) => (
                <TextFieldFactoringCompany
                    {...params}
                    onClick={onOpenDialog}
                    variant="filled"
                    size="small"
                    required
                    label={t('core:selects.invoicing_company.label')}
                    InputProps={{
                        ...params.InputProps,
                        style           : { cursor: 'pointer' },
                        disableUnderline: true,
                        readOnly        : true,
                        endAdornment    : (
                            <SwapHorizIcon
                                fontSize="large"
                                color="secondary"
                                sx={{
                                    borderRadius: '50%',
                                    padding     : '5px'
                                }}
                            />
                        )
                    }}
                />
            )}
        />
    );
}
