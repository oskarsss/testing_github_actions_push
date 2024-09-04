import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import CompanyTab from '@/views/settings/tabs/Company/CompanyTab';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout>
        <CompanyTab />
    </SettingsLayout>
);

const CompanyPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default CompanyPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
