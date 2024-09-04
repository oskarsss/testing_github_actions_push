import { PERMISSIONS } from '@/models/permissions/permissions';
import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import Teams from '@/views/settings/tabs/teams/main';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

function Page() {
    return (
        <SettingsLayout turnOffScrollBar>
            <Teams />
        </SettingsLayout>
    );
}

const ProtectedPage = withPermissions(Page, PERMISSIONS.SETTINGS_PAGE);

export default ProtectedPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
