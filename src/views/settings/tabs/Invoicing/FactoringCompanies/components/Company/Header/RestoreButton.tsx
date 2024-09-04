import VectorIcons from '@/@core/icons/vector_icons';
import { Button } from '@mui/material';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';

type Props = {
    factoringCompanyId: FactoringCompanyModel['factoringCompanyId'];
};

export default function RestoreButton({ factoringCompanyId }: Props) {
    const { t } = useAppTranslation();

    const [restoreFactoringCompany, {
        isLoading,
        isSuccess
    }] =
        FactoringCompaniesGrpcService.endpoints.restoreFactoringCompany.useMutation();

    const restore = () => restoreFactoringCompany({ factoringCompanyId });

    return (
        <Button
            sx={{ height: '36px' }}
            variant="outlined"
            color="success"
            startIcon={(
                <VectorIcons.RestoreIcon
                    sx={{
                        fontSize: '16px !important',
                        color   : (theme) => theme.palette.utility.text.error,
                        path    : {
                            fill: (theme) => theme.palette.semantic.foreground.brand.primary
                        }
                    }}
                />
            )}
            size="small"
            disabled={isLoading || isSuccess}
            onClick={restore}
        >
            {t('common:button.restore')}
        </Button>
    );
}
