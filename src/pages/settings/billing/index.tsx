import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Billing from '../../../views/settings/tabs/Billing/Billing';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <Billing />
    </SettingsLayout>
);

const BillingPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_BILLING_PAGE);

export default BillingPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
