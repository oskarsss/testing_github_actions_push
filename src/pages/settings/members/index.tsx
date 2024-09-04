import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Members from '../../../views/settings/tabs/Members/Members';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <Members />
    </SettingsLayout>
);

const TeamPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default TeamPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
