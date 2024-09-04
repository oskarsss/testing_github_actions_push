import CreditCategories from '@/views/settings/tabs/Settlements/Categories/CreditCategories';
import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <CreditCategories />
    </SettingsLayout>
);

const CreditCategoriesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default CreditCategoriesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
