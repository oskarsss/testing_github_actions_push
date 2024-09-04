import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import FactoringCompanies from '../../../../views/settings/tabs/Invoicing/FactoringCompanies/FactoringCompanies';
import withPermissions from '../../../../store/app/hooks';
import SettingsLayout from '../../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout>
        <FactoringCompanies />
    </SettingsLayout>
);

const FactoringCompaniesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default FactoringCompaniesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
