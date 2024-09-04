import Company from '@/views/settings/tabs/Invoicing/FactoringCompanies/components/Company/Company';
import Box from '@mui/material/Box';
import SettingsEmptyScreen, { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { memo } from 'react';
import { Stack } from '@mui/material';

type Props = {
    factoringCompanies: FactoringCompanyModel[];
    fallback: () => void;
};

function FactoringCompaniesContent({
    factoringCompanies,
    fallback
}: Props) {
    return (
        <Stack bgcolor="semantic.background.secondary">
            {factoringCompanies.length ? (
                factoringCompanies.map((company) => (
                    <Company
                        key={company.factoringCompanyId}
                        company={company}
                    />
                ))
            ) : (
                <Box
                    position="relative"
                    minHeight="80vh"
                    bgcolor="semantic.foreground.white.tertiary"
                >
                    <SettingsEmptyScreen
                        type={FallbackType.FACTORING_COMPANIES}
                        onClickFallback={fallback}
                    />
                </Box>
            )}
        </Stack>
    );
}

export default memo(FactoringCompaniesContent);
