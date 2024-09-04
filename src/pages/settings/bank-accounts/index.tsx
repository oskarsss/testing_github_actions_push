import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import BankAccounts from '@/views/settings/tabs/BankAccounts/BankAccounts';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <BankAccounts />
    </SettingsLayout>
);

export default withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
