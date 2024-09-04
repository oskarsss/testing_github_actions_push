import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Integrations from '../../../views/settings/tabs/Integrations/Integrations';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout
        turnOffScrollBar
        resetWidthContainer
        sxSection={{ padding: 0 }}
    >
        <Integrations />
    </SettingsLayout>
);

const IntegrationsPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default IntegrationsPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
