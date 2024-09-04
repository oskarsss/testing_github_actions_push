import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Path } from 'react-hook-form';
import { useFactoringCompanyFormContext } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import { FactoringCompanyDefaultValue } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/factoring-company-form-config';
import { Button } from '@mui/material';

type Props = {
    name: Path<FactoringCompanyDefaultValue>;
};

export default function ClearButton({ name }: Props) {
    const { t } = useAppTranslation();
    const { setValue } = useFactoringCompanyFormContext();

    const handleDeleteFile = () => {
        setValue(name, '', { shouldDirty: true });
    };

    return (
        <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteFile}
            sx={{ padding: '0px 8px' }}
        >
            {t('common:button.clear')}
        </Button>
    );
}
