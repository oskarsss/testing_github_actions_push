import { PERMISSIONS } from '@/models/permissions/permissions';
import withPermissions from '@/store/app/hooks';
import getTranslation from '@/utils/getTranslation';
import SettingsLayout from '@/views/settings/SettingsLayout';
import NotificationSettingsView from '@/views/settings/tabs/notifications';
import { GetStaticPropsContext } from 'next';

function NotificationSettings() {
    return (
        <SettingsLayout turnOffScrollBar>
            <NotificationSettingsView />
        </SettingsLayout>
    );
}

const NotificationSettingsPage = withPermissions(NotificationSettings, PERMISSIONS.SETTINGS_PAGE);

export default NotificationSettingsPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
