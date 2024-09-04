import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import DriverTypes from '@/views/settings/tabs/Drivers/Types/DriverTypes';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <DriverTypes />
    </SettingsLayout>
);

const DriverTypesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default DriverTypesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
