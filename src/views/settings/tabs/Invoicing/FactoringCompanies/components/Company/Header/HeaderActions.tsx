import { Button } from '@mui/material';
import SettingIcons from '@/views/settings/icons/icons';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import { useCompanyDialog } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/EditFactoringCompany';
import { useViewNoaDialog } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/ViewNoaDialog/ViewNoaDialog';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { memo } from 'react';
import DeleteButton from '@/views/settings/tabs/Invoicing/FactoringCompanies/components/Company/Header/DeleteButton';
import RestoreButton from '@/views/settings/tabs/Invoicing/FactoringCompanies/components/Company/Header/RestoreButton';

type Props = {
    company: FactoringCompanyModel;
};

function HeaderActions({ company }: Props) {
    const { t } = useAppTranslation();
    const companyDialog = useCompanyDialog();
    const viewNoaDialog = useViewNoaDialog();

    const isDeleted = company.deleted;

    const openViewNoA = () =>
        viewNoaDialog.open({
            url : company.noaFileId,
            name: company.name
        });

    const openCompanyDialog = () => companyDialog.open({ company });

    return (
        <Stack
            spacing={2}
            direction="row"
        >
            {isDeleted ? (
                <RestoreButton factoringCompanyId={company.factoringCompanyId} />
            ) : (
                <DeleteButton company={company} />
            )}

            <Button
                sx={{ height: '36px' }}
                variant="outlined"
                color="primary"
                size="small"
                disabled={!company.noaFileId}
                onClick={openViewNoA}
                startIcon={(
                    <SettingIcons.ViewNoa
                        sx={{
                            fontSize: '16px',
                            fill    : (theme) =>
                                !company.noaFileId
                                    ? theme.palette.semantic.foreground.disabled
                                    : theme.palette.semantic.foreground.brand.primary
                        }}
                    />
                )}
            >
                {t('common:button.view_noa')}
            </Button>

            <Button
                sx={{ height: '36px' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={openCompanyDialog}
                startIcon={<EditIcon sx={{ fontSize: '16px !important' }} />}
            >
                {t('common:button.edit')}
            </Button>
        </Stack>
    );
}

export default memo(HeaderActions);
