import Roles from '@/views/settings/tabs/Roles/Roles';
import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <Roles />
    </SettingsLayout>
);

const RolesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default RolesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
