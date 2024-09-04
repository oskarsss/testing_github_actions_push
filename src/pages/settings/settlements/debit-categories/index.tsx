import DebitCategories from '@/views/settings/tabs/Settlements/Categories/DebitCategories';
import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <DebitCategories />
    </SettingsLayout>
);

const DebitCategoriesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default DebitCategoriesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
