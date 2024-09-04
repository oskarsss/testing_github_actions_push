import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Invoicing from '@/views/settings/tabs/Invoicing/InvoicingCompanies/InvoicingCompanies';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout>
        <Invoicing />
    </SettingsLayout>
);

const InvoicingPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default InvoicingPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
