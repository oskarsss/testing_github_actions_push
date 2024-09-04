import { TextFieldFactoringCompany } from '@/@core/fields/select/FactoringCompanySelect';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Autocomplete } from '@mui/material';
import { useEditLoadFactoringCompanyDialog } from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-invoice-factoring-company/EditLoadFactoringCompanyDialog';
import { useFactoringCompaniesMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    loadId: string;
    invoiceFactoringCompanyId: string;
};

export default function LoadFactoringCompanyField({
    loadId,
    invoiceFactoringCompanyId
}: Props) {
    const { t } = useAppTranslation('modals');
    const dialog = useEditLoadFactoringCompanyDialog();
    const factoringCompanies = useFactoringCompaniesMap();
    const factoryCompany = factoringCompanies[invoiceFactoringCompanyId] || {
        name              : 'None',
        factoringCompanyId: ''
    };

    const onOpenDialog = () => {
        dialog.open({
            invoiceFactoringCompanyId,
            loadId
        });
    };

    return (
        <Autocomplete
            value={factoryCompany}
            options={[]}
            readOnly
            getOptionLabel={() => factoryCompany.name}
            sx={{ width: '200px' }}
            renderInput={(params) => (
                <TextFieldFactoringCompany
                    {...params}
                    onClick={onOpenDialog}
                    variant="filled"
                    size="small"
                    label={t('loads.edit_load.fields.titles.factoring_company')}
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
