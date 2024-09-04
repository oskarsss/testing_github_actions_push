import { memo, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Fade, Tooltip } from '@mui/material';
import { CompanyBlock } from '@/views/fleet/trailers/Details/components/Right/styled';
import AddIcon from '@mui/icons-material/Add';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { useSelectCompanyDialog } from '@/views/fleet/trailers/Details/dialogs/SelectCompany/SelectCompany';
import VectorIcons from '@/@core/icons/vector_icons';
import { applyTestId, TestIDs } from '@/configs/tests';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useEditTrailerCompanyDialog } from '@/views/fleet/trailers/TrailerCompanies/dialogs/EditTrailerCompanyFullDialog/EditTrailerCompany';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';

type Props = {
    id: string;
    company_id: string;
    name: string;
};

const Company = ({
    id,
    company_id,
    name
}: Props) => {
    const { t } = useAppTranslation();
    const selectCompanyMenu = useSelectCompanyDialog();
    const editTrailerCompanyDialog = useEditTrailerCompanyDialog();
    const [unAssignCompany] = TrailersGrpcService.useUnAssignCompanyFromTrailerMutation();
    const confirm = useConfirm();

    const removeTrailerCompany = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:trailers.unassign.company.title',
            body              : 'modals:trailers.unassign.company.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: { name }
            },
            onConfirm: () =>
                unAssignCompany({
                    trailerId       : id,
                    trailerCompanyId: company_id
                }).unwrap()
        });
    };

    const openCompanyMenu = () => {
        selectCompanyMenu.open({ id });
    };

    const openEditTrailerCompanyDialog = () => {
        editTrailerCompanyDialog.open({ trailerCompanyId: company_id });
    };

    const remove = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        removeTrailerCompany();
    };

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('entity:trailer_company')}</Typography>

                {!company_id && (
                    <Button
                        onClick={openCompanyMenu}
                        startIcon={<AddIcon />}
                        {...applyTestId(TestIDs.pages.trailerProfile.buttons.assignCompany)}
                    >
                        {t('trailers:profile.right.company.buttons.assign')}
                    </Button>
                )}
            </Box>
            {company_id ? (
                <Fade in>
                    <RightStyled.VendorWrap onClick={openEditTrailerCompanyDialog}>
                        <CompanyBlock>
                            <VectorIcons.DetailsIcons.Company />
                            <Typography variant="body1">{name}</Typography>
                        </CompanyBlock>

                        <Tooltip title={t('trailers:profile.right.company.buttons.remove')}>
                            <RightStyled.IconButton
                                isUnassign
                                onClick={remove}
                                {...applyTestId(TestIDs.pages.trailerProfile.buttons.removeCompany)}
                            >
                                <VectorIcons.Garbage />
                            </RightStyled.IconButton>
                        </Tooltip>
                    </RightStyled.VendorWrap>
                </Fade>
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('trailers:profile.right.company.empty')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(Company);
