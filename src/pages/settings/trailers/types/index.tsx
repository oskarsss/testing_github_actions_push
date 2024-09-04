import TrailerTypes from '@/views/settings/tabs/Trailers/Types/TrailerTypes';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../../../store/app/hooks';
import SettingsLayout from '../../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <TrailerTypes />
    </SettingsLayout>
);

const TrailerTypesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default TrailerTypesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
