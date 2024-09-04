import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import ChangePassword from '../../../views/settings/tabs/Password/Password';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout>
        <ChangePassword />
    </SettingsLayout>
);

const PasswordPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default PasswordPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
