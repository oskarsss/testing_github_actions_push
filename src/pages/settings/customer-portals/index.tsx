import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import SettingsLayout from '@/views/settings/SettingsLayout';
import withPermissions from '@/store/app/hooks';
import CustomerPortals from '@/views/settings/tabs/customer-portal';

const PageComponent = () => (
    <SettingsLayout>
        <CustomerPortals />
    </SettingsLayout>
);

const Settings = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default Settings;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
