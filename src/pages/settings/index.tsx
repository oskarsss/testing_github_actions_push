import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../store/app/hooks';
import Profile from '../../views/settings/tabs/Profile/Profile';
import SettingsLayout from '../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout>
        <Profile />
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
