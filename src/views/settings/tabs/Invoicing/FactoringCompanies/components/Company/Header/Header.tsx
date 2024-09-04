import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DescriptionWrapper } from '@/views/settings/components/styled';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import HeaderActions from './HeaderActions';
import HeaderTitle from './HeaderTitle';

type Props = {
    company: FactoringCompanyModel;
};

export default function CompanyHeader({ company }: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack width="100%">
            <Stack
                width="100%"
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                spacing={3}
            >
                <HeaderTitle company={company} />

                <HeaderActions company={company} />
            </Stack>

            <DescriptionWrapper>
                <Typography
                    fontWeight={500}
                    variant="body1"
                    component="div"
                >
                    {t('settings:factoring_companies.company.content.note', {
                        note: company.note
                    })}
                </Typography>
            </DescriptionWrapper>
        </Stack>
    );
}
