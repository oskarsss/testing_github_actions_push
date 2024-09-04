import InvoiceItemCategories from '@/views/settings/tabs/Loads/InvoiceItemCategories/InvoiceItemCategories';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../../../store/app/hooks';
import SettingsLayout from '../../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <InvoiceItemCategories />
    </SettingsLayout>
);

const InvoiceItemCategoriesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default InvoiceItemCategoriesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
