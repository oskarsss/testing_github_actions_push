import DriverPayCategories from '@/views/settings/tabs/Loads/DriverPayCategories/DriverPayCategories';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../../../store/app/hooks';
import SettingsLayout from '../../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <DriverPayCategories />
    </SettingsLayout>
);

const DriverPayCategoriesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default DriverPayCategoriesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
