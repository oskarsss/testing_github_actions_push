import { useMemo, useState } from 'react';
import { useCreateFactoringCompanyDialog } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/CreateFactoringCompany';
import { Stack } from '@mui/material';
import SettingIcons from '@/views/settings/icons/icons';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';
import Skeleton from './components/Skeletons/Skeletons';
import FactoringCompaniesContent from './components/FactoringCompaniesContent/FactoringCompaniesContent';

export default function FactoringCompanies() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);
    const createFactoringCompanyDialog = useCreateFactoringCompanyDialog();
    const {
        factoringCompanies,
        isLoading
    } =
        FactoringCompaniesGrpcService.useGetFactoringCompaniesQuery(
            {},
            {
                selectFromResult: (result) => ({
                    factoringCompanies: result.data?.factoringCompanies || [],
                    isLoading         : result.isLoading
                })
            }
        );

    const openCreateFactoringCompanyDialog = () => createFactoringCompanyDialog.open({});

    const viewCompanies = useMemo(
        () =>
            factoringCompanies.filter((company) => {
                if (value === TabsValue.CURRENT) {
                    return !company.deleted;
                }

                return company.deleted;
            }),
        [factoringCompanies, value]
    );

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <Stack gap="28px">
            <SettingsHeader
                title="settings:navigation.invoicing.factoring_companies"
                icon={<SettingIcons.FactoringCompanies />}
                onClick={openCreateFactoringCompanyDialog}
                children_left_side={(
                    <SettingsHeaderTabs
                        value={value}
                        setValue={setValue}
                        categories={factoringCompanies}
                    />
                )}
            />

            <FactoringCompaniesContent
                factoringCompanies={viewCompanies}
                fallback={openCreateFactoringCompanyDialog}
            />
        </Stack>
    );
}
