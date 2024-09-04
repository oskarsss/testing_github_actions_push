import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import AdvancedConfig from 'src/views/settings/tabs/advanced-config';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <AdvancedConfig />
    </SettingsLayout>
);

const AdvancedConfigPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default AdvancedConfigPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
