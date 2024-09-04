import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import General from '../../../views/settings/tabs/Settlements/SettlementsGeneral/SettlementsGeneral';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout>
        <General />
    </SettingsLayout>
);

const GeneralPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default GeneralPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
