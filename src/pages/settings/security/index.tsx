import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Security from '../../../views/settings/tabs/Security/Security';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout>
        <Security />
    </SettingsLayout>
);

const SecurityPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default SecurityPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
