import Cycles from '@/views/settings/tabs/Settlements/Cycles/Cycles';
import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

const PageComponent = () => (
    <SettingsLayout>
        <Cycles />
    </SettingsLayout>
);

const CyclesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default CyclesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings'])),

            // Note that when `now` is passed to the app, you need to make sure the
            // value is updated from time to time, so relative times are updated. See
            // https://next-intl-docs.vercel.app/docs/usage/configuration#global-now-value
            now: new Date().getTime()
        }
    };
}
