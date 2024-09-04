import RevenueTypes from '@/views/settings/tabs/Settlements/RevenueTypes/RevenueTypes';
import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout>
        <RevenueTypes />
    </SettingsLayout>
);

const RevenueTypesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default RevenueTypesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
