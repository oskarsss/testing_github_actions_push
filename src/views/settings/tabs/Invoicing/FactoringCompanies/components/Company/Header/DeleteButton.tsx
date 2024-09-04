import VectorIcons from '@/@core/icons/vector_icons';
import { Button } from '@mui/material';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    company: FactoringCompanyModel;
};

export default function DeleteButton({ company }: Props) {
    const { t } = useAppTranslation();

    const confirmDialog = useConfirm();

    const [deleteFactoringCompany, {
        isLoading,
        isSuccess
    }] =
        FactoringCompaniesGrpcService.endpoints.deleteFactoringCompany.useMutation();

    const remove = () =>
        confirmDialog({
            title             : 'modals:settings.invoicing.factoring_companies.delete.title',
            body              : 'modals:settings.invoicing.factoring_companies.delete.body',
            confirm_text      : 'common:button.delete',
            max_width_dialog  : '390px',
            translationOptions: {
                title: {
                    companyName: company.name
                }
            },
            onConfirm: () =>
                deleteFactoringCompany({
                    factoringCompanyId: company.factoringCompanyId
                })
        });

    return (
        <Button
            sx={{ height: '36px' }}
            variant="outlined"
            color="error"
            startIcon={(
                <VectorIcons.TrashIcon
                    sx={{
                        fontSize: '16px !important',
                        color   : (theme) => theme.palette.utility.text.error,
                        path    : {
                            fill: (theme) => theme.palette.utility.foreground.error.primary
                        }
                    }}
                />
            )}
            size="small"
            disabled={isLoading || isSuccess}
            onClick={remove}
        >
            {t('common:button.delete')}
        </Button>
    );
}
